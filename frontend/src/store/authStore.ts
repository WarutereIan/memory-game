import { create } from 'zustand';
import { User } from '../types/auth';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: authService.isAuthenticated(),
  
  setUser: (user) => set({ 
    user,
    isAuthenticated: !!user 
  }),
  
  logout: () => {
    authService.logout();
    set({ 
      user: null,
      isAuthenticated: false 
    });
  },
}));