import { create } from "zustand";
import { GameDetails, PlayerScore } from "../types/socket";

interface GameState {
  username: string;
  gameDetails: GameDetails | null;
  gameStarted: boolean;
  setUsername: (username: string) => void;
  updateGameDetails: (details: GameDetails) => void;
  updatePlayerScore: (username: string, score: PlayerScore) => void;
  isMyTurn: () => boolean;
  updateGameStarted: (isStarted: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  username: "",
  gameDetails: null,
  gameStarted: false,

  setUsername: (username: string) => set({ username }),

  updateGameDetails: (details: GameDetails) => set({ gameDetails: details }),

  updatePlayerScore: (username: string, score: PlayerScore) =>
    set((state) => {
      if (!state.gameDetails) return state;

      const newScores = state.gameDetails.currentPlayerScores.map(
        (playerScore) =>
          playerScore.username === username ? score : playerScore
      );

      return {
        gameDetails: {
          ...state.gameDetails,
          currentPlayerScores: newScores,
        },
      };
    }),

  isMyTurn: () => {
    const state = get();
    return state.gameDetails?.currentPlayerTurn === state.username;
  },

  updateGameStarted: (isStarted: boolean) => {
    set({ gameStarted: isStarted });
  },
}));
