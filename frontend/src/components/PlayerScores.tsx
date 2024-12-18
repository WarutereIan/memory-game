import React from 'react';
import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const PlayerScores: React.FC = () => {
  const { gameDetails, username } = useGameStore();

  if (!gameDetails) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5" />
        <h3 className="font-semibold">Player Scores</h3>
      </div>
      
      <div className="space-y-4">
        {gameDetails.currentPlayerScores.map((score) => (
          <div
            key={score.username}
            className={`p-3 rounded ${
              score.username === gameDetails.currentPlayerTurn
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                {score.username} {score.username === username && '(You)'}
              </span>
              <span className="text-sm">
                {score.username === gameDetails.currentPlayerTurn ? '(Current Turn)' : ''}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Matches: {score.correctPairsMatched}</div>
              <div>Misses: {score.misses}</div>
              <div>Current Streak: {score.currentStreak}</div>
              <div>Best Streak: {score.longestStreak}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerScores;