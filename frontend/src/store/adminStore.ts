import { create } from "zustand";
import { AdminUser, AdminStats } from "../types/admin";
import { adminService } from "../services/adminService";

interface AdminState {
  user: AdminUser | null;
  stats: AdminStats | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: AdminUser | null) => void;
  fetchStats: () => Promise<void>;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  user: null,
  stats: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminService.getStats();
      if (response.success) {
        set({ stats: response.stats, isLoading: false });
      } else {
        set({ error: "Failed to fetch stats", isLoading: false });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.msg || "Failed to fetch admin stats",
        isLoading: false,
      });
    }
  },

  logout: () => {
    adminService.logout();
    set({ user: null, stats: null });
  },
}));
