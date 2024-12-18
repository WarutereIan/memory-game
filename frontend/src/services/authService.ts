import axios from "axios";
import { SignUpData, LoginData, AuthResponse } from "../types/auth";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("token");
  }

  async signup(data: SignUpData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("token");
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

  getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    localStorage.setItem("token", token);
    this.token = token;
  }
}

export const authService = new AuthService();
