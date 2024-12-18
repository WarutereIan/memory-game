import React from 'react';
import { Medal, Trophy } from 'lucide-react';
import { useStatsStore } from '../../store/statsStore';

const StatCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
    <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const PlayerStats: React.FC = () => {
  const { playerStats, isLoading, error } = useStatsStore();

  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!playerStats) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold">Your Statistics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Single Player</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard 
              title="Games Played" 
              value={playerStats.numOfGamesSingleplayer} 
            />
            <StatCard 
              title="Best Score" 
              value={playerStats.highScoreSingleplayer} 
            />
            <StatCard 
              title="Total Matches" 
              value={playerStats.totalCardMatchesSingleplayer} 
            />
            <StatCard 
              title="Best Streak" 
              value={playerStats.longestStreakSingleplayer} 
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Multiplayer</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard 
              title="Games Played" 
              value={playerStats.numOfGamesMultiplayer} 
            />
            <StatCard 
              title="Best Score" 
              value={playerStats.highScoreMultiplayer} 
            />
            <StatCard 
              title="Total Matches" 
              value={playerStats.totalCardMatchesMultiplayer} 
            />
            <StatCard 
              title="Best Streak" 
              value={playerStats.longestStreakMultiplayer} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;