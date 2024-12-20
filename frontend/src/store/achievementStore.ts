import { create } from "zustand";
import { AchievementProgress, AchievementState } from "../types/achievements";
import { achievements } from "../data/achievements";
import { PlayerProfile } from "../types/stats";

interface AchievementStore extends AchievementState {
  checkAchievements: (stats: PlayerProfile) => void;
  getProgress: (achievementId: string) => AchievementProgress | null;
}

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements,
  unlockedAchievements: [],
  progress: {},

  checkAchievements: (stats: PlayerProfile) => {
    const { achievements, unlockedAchievements } = get();
    const newUnlocked = achievements.filter(
      (achievement) =>
        !unlockedAchievements.includes(achievement.id) &&
        achievement.condition(stats)
    );

    if (newUnlocked.length > 0) {
      set((state) => ({
        unlockedAchievements: [
          ...state.unlockedAchievements,
          ...newUnlocked.map((a) => a.id),
        ],
      }));
    }
  },

  getProgress: (achievementId: string) => {
    const { progress } = get();
    return progress[achievementId] || null;
  },
}));
