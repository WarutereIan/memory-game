import React, { useEffect } from 'react';
import { Medal, Trophy } from 'lucide-react';
import { useStatsStore } from '../../store/statsStore';

const Leaderboard: React.FC = () => {
  const { leaderboard, fetchLeaderboard, isLoading, error } = useStatsStore();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (isLoading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Medal className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.userId}
            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {index < 3 ? (
                <Trophy className={`w-6 h-6 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-amber-700'
                }`} />
              ) : (
                <span className="text-lg font-semibold">{index + 1}</span>
              )}
            </div>
            
            <div className="flex-grow">
              <p className="font-medium">{entry.username}</p>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Score: {entry.highScoreSingleplayer} | Matches: {entry.totalCardMatchesSingleplayer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;