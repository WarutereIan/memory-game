export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'hard';
export type CardTheme = 'princess' | 'fantasy' | 'nature';

export interface GameScore {
  baseScore: number;
  timeMultiplier: number;
  finalScore: number;
}

export interface GameState {
  isActive: boolean;
  isPaused: boolean;
  score: GameScore;
  theme: CardTheme;
}