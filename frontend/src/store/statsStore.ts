import { create } from 'zustand';
import { PlayerProfile, LeaderboardEntry } from '../types/stats';
import { statsService } from '../services/statsService';

interface StatsState {
  playerStats: PlayerProfile | null;
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  fetchPlayerStats: () => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
}

export const useStatsStore = create<StatsState>((set) => ({
  playerStats: null,
  leaderboard: [],
  isLoading: false,
  error: null,

  fetchPlayerStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const stats = await statsService.getPlayerStats();
      set({ playerStats: stats, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch player stats', isLoading: false });
    }
  },

  fetchLeaderboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const leaderboard = await statsService.getLeaderboard();
      set({ leaderboard, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch leaderboard', isLoading: false });
    }
  },
}));