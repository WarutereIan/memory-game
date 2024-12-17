export interface IUser {
  username: string;
  email: string;
  password: string;
  highScoreMultiplayer: number;
  highScoreSingleplayer: number;
  longestStreakSingleplayer: number;
  longestStreakMultiplayer: number;
  numOfGamesMultiplayer: number;
  numOfGamesSingleplayer: number;
  totalCardMatchesMultiplayer: number;
  totalCardMatchesSingleplayer: number;
  totalCardMissesSingleplayer: number;
  totalCardMissesMultiplayer: number;
  totalWinsMultiplayer: number;
}
