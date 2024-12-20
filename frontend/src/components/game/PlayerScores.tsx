import React from "react";
import { Trophy } from "lucide-react";
import { useGameStore } from "../../store/gameStore";

export const PlayerScores: React.FC = () => {
  const { gameDetails, username } = useGameStore();

  if (!gameDetails) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-rose-50 rounded-full text-rose-400">
          <Trophy className="w-5 h-5" />
        </div>
        <h3 className="font-serif italic text-xl">Player Scores</h3>
      </div>

      <div className="space-y-3">
        {gameDetails.currentPlayerScores.map((score) => (
          <div
            key={score.username}
            className={`p-4 rounded-lg ${
              score.username === gameDetails.currentPlayerTurn
                ? "bg-rose-50"
                : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-serif italic text-lg">
                {score.username} {score.username === username && "(You)"}
              </span>
              {score.username === gameDetails.currentPlayerTurn && (
                <span className="text-sm text-rose-400 italic">
                  Current Turn
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div>
                <span className="font-medium">Matches:</span>{" "}
                {score.correctPairsMatched}
              </div>
              <div>
                <span className="font-medium">Misses:</span> {score.misses}
              </div>
              <div>
                <span className="font-medium">Current Streak:</span>{" "}
                {score.currentStreak}
              </div>
              <div>
                <span className="font-medium">Best Streak:</span>{" "}
                {score.longestStreak}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
