import { socketService } from "../services/socketService";
import { PlayerScore } from "../types/socket";

export const calculateMultiplayerScore = (
  baseScore: number,
  timeMultiplier: number,
  streak: number
): number => {
  const streakBonus = streak > 1 ? streak * 0.1 : 1; // 10% bonus per streak
  return Math.round(baseScore * timeMultiplier * streakBonus);
};

export const updatePlayerScore = (
  currentScore: PlayerScore,
  timeMultiplier: number
): PlayerScore => {
  return {
    ...currentScore,
    correctPairsMatched: Math.round(
      currentScore.correctPairsMatched * timeMultiplier
    ),
  };
};
