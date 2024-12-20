import React from 'react';
import { Trophy, Zap } from 'lucide-react';

interface GameStatsProps {
  score: number;
  currentStreak: number;
  matches: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, currentStreak, matches }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">Score</span>
        </div>
        <p className="text-2xl font-bold">{score}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Streak</span>
        </div>
        <p className="text-2xl font-bold">{currentStreak}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Matches</p>
        <p className="text-2xl font-bold">{matches}</p>
      </div>
    </div>
  );
};

export default GameStats;