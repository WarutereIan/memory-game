import React, { useEffect } from "react";
import { Brain } from "lucide-react";
import { useGameStore } from "./store/gameStore";
import { useAuthStore } from "./store/authStore";
import { useStatsStore } from "./store/statsStore";
import { socketService } from "./services/socketService";
import { GameBoard } from "./components/game";
import PlayerScores from "./components/PlayerScores";
import GameChat from "./components/GameChat";
import WaitingRoom from "./components/WaitingRoom";
import AuthWrapper from "./components/auth/AuthWrapper";
import PlayerStats from "./components/stats/PlayerStats";
import Leaderboard from "./components/stats/Leaderboard";

function App() {
  const { gameDetails, updateGameDetails } = useGameStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { fetchPlayerStats } = useStatsStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlayerStats();
    }
  }, [isAuthenticated, fetchPlayerStats]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
              Memory Match
            </h1>
          </div>
        </div>

        {!isAuthenticated ? (
          <AuthWrapper />
        ) : !gameDetails || gameDetails.gameStatus === "not_started" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlayerStats />
            <Leaderboard />
            <div className="lg:col-span-2">
              <WaitingRoom />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <GameBoard />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <PlayerScores />
              <GameChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
