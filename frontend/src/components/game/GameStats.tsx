import React from 'react';
import { Clock, Zap } from 'lucide-react';

interface GameStatsProps {
  turns: number;
  matches: number;
  currentStreak: number;
  elapsedTime: number;
}

const GameStats: React.FC<GameStatsProps> = ({ turns, matches, currentStreak, elapsedTime }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Time</span>
        </div>
        <p className="text-2xl font-bold">{Math.floor(elapsedTime / 1000)}s</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Streak</span>
        </div>
        <p className="text-2xl font-bold">{currentStreak}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Turns</p>
        <p className="text-2xl font-bold">{turns}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Matches</p>
        <p className="text-2xl font-bold">{matches}</p>
      </div>
    </div>
  );
};

export default GameStats;