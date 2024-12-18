import axios from "axios";
import { GameResult, PlayerProfile, LeaderboardEntry } from "../types/stats";
import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

class StatsService {
  private getHeaders() {
    const token = authService.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  async postSinglePlayerResult(result: GameResult): Promise<PlayerProfile> {
    const response = await axios.post(
      `${API_URL}/profile/singleplayer/result`,
      result,
      this.getHeaders()
    );
    return response.data.userProfile;
  }

  async postMultiPlayerResult(result: GameResult): Promise<PlayerProfile> {
    const response = await axios.post(
      `${API_URL}/profile/multiplayer/result`,
      result,
      this.getHeaders()
    );
    return response.data.userProfile;
  }

  async getPlayerStats(): Promise<PlayerProfile> {
    const response = await axios.get(
      `${API_URL}/profile/player/stats`,
      this.getHeaders()
    );

    return response.data;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const response = await axios.get(
      `${API_URL}/profile/leaderboard`,
      this.getHeaders()
    );

    return response.data.leaderboards;
  }
}

export const statsService = new StatsService();
