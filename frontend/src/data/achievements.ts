import { Achievement } from "../types/achievements";
import { PlayerProfile } from "../types/stats";

export const achievements: Achievement[] = [
  {
    id: "first_game",
    title: "First Steps",
    description: "Play your first game",
    icon: "🎮",
    condition: (stats: PlayerProfile) =>
      stats.numOfGamesSingleplayer + stats.numOfGamesMultiplayer > 0,
  },
  {
    id: "first_win",
    title: "Victory!",
    description: "Win your first game",
    icon: "🏆",
    condition: (stats: PlayerProfile) =>
      stats.highScoreSingleplayer > 0 || stats.highScoreMultiplayer > 0,
  },
  {
    id: "five_games",
    title: "Getting Started",
    description: "Play 5 games",
    icon: "🎲",
    condition: (stats: PlayerProfile) =>
      stats.numOfGamesSingleplayer + stats.numOfGamesMultiplayer >= 5,
  },
  {
    id: "perfect_game",
    title: "Perfect Memory",
    description: "Complete a game with no misses",
    icon: "⭐",
    condition: (stats: PlayerProfile) =>
      stats.totalCardMissesSingleplayer === 0 &&
      stats.highScoreSingleplayer > 0,
  },
  {
    id: "streak_master",
    title: "Streak Master",
    description: "Achieve a streak of 5 or more",
    icon: "⚡",
    condition: (stats: PlayerProfile) =>
      stats.longestStreakSingleplayer >= 5 ||
      stats.longestStreakMultiplayer >= 5,
  },
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Play 5 multiplayer games",
    icon: "🦋",
    condition: (stats: PlayerProfile) => stats.numOfGamesMultiplayer >= 5,
  },
];
