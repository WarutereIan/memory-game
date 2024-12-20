import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  AdminLoginData,
  AdminSignUpData,
  AdminStats,
  AdminUser,
} from "../types/admin";

const API_URL = import.meta.env.VITE_API_URL;

class AdminService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("admin_token");
  }

  private getHeaders() {
    return {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }

  async login(data: AdminLoginData): Promise<AdminUser> {
    const response = await axios.post(`${API_URL}/admin/login`, data);
    if (response.data.token) {
      this.token = response.data.token;
      localStorage.setItem("admin_token", response.data.token);
    }
    return this.getUserFromToken(response.data.token);
  }

  async signup(data: AdminSignUpData): Promise<AdminUser> {
    const response = await axios.post(`${API_URL}/admin/signup`, data);
    if (response.data.token) {
      this.token = response.data.token;
      localStorage.setItem("admin_token", response.data.token);
    }
    return this.getUserFromToken(response.data.token);
  }

  async getStats(): Promise<{ success: boolean; stats: AdminStats }> {
    const response = await axios.get(
      `${API_URL}/admin/stats`,
      this.getHeaders()
    );
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("admin_token");
    this.token = null;
  }

  isAuthenticated(): boolean {
    if (!this.token) return false;
    try {
      const decoded: any = jwtDecode(this.token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getUserFromToken(token: string): AdminUser {
    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.sub,
        username: decoded.username,
        email: decoded.email,
        role: "admin",
      };
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

export const adminService = new AdminService();
