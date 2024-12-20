import { PlayerProfile } from "./stats";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: PlayerProfile) => boolean;
  unlockedAt?: string;
}

export interface AchievementProgress {
  id: string;
  progress: number;
  total: number;
}

export interface AchievementState {
  achievements: Achievement[];
  unlockedAchievements: string[];
  progress: Record<string, AchievementProgress>;
}
