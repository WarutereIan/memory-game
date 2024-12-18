export interface PlayerProfile {
  userId: string;
  numOfGamesSingleplayer: number;
  totalCardMatchesSingleplayer: number;
  totalCardMissesSingleplayer: number;
  longestStreakSingleplayer: number;
  highScoreSingleplayer: number;
  numOfGamesMultiplayer: number;
  totalCardMatchesMultiplayer: number;
  totalCardMissesMultiplayer: number;
  longestStreakMultiplayer: number;
  highScoreMultiplayer: number;
}

export interface GameResult {
  numOfMatches: number;
  numOfMisses: number;
  longestStreak: number;
  score: number;
}

export interface LeaderboardEntry extends PlayerProfile {
  username: string;
}