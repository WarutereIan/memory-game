import React from "react";
import { Navigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import GameBoard from "../game/GameBoard";
import { PlayerScores } from "../game/PlayerScores";
import GameChat from "../GameChat";
import { HomeButton } from "../ui/HomeButton";

const MultiplayerGame: React.FC = () => {
  const { gameStarted } = useGameStore();

  if (!gameStarted) {
    return <Navigate to="/multiplayer" replace />;
  }

  return (
    <div className="min-h-screen bg-rose-50/30 px-4 py-8">
      <HomeButton />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Game Board */}
        <div>
          <GameBoard />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <PlayerScores />
        </div>
      </div>
    </div>
  );
};

export default MultiplayerGame;
