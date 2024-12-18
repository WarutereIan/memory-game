export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'hard';