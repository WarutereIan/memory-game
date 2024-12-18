export interface PlayerScore {
  currentStreak: number;
  correctPairsMatched: number;
  misses: number;
  longestStreak: number;
  username: string;
}

export interface GameMessage {
  username: string;
  msg: string;
  timeSent: string;
}

export interface GameDetails {
  players: string[];
  gameStatus: 'not_started' | 'started' | 'finished';
  currentPlayerTurn: string;
  currentPlayerScores: PlayerScore[];
  gameMessages: GameMessage[];
  timerStarted: boolean;
  timerStartedBy: string;
  timerStoppedBy: string;
  validCards: number[];
}

export interface GameStartMessage {
  username: string;
  roomID: string;
}

export interface TimerMessage {
  username: string;
  roomID: string;
}

export interface TurnChangeMessage {
  username: string;
  roomID: string;
  cardsChosen: number[];
}

export interface MatchedCardsMessage {
  username: string;
  roomID: string;
  player_score: PlayerScore;
  validCardsRemaining: number[];
  cardsChosen: number[];
}

export interface ChatMessage {
  username: string;
  message: string;
  timeSent: string;
  roomID: string;
}