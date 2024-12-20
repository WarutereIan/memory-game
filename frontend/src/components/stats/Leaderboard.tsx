import React, { useEffect } from "react";
import { Medal, Trophy, Target, Crown } from "lucide-react";
import { useStatsStore } from "../../store/statsStore";
import { HomeButton } from "../ui/HomeButton";

const Leaderboard: React.FC = () => {
  const { leaderboard, fetchLeaderboard, isLoading, error } = useStatsStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  if (isLoading) {
    return (
      <div className="text-center font-serif italic text-gray-600">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-serif italic text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50/30 px-4 py-8">
      <HomeButton />
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-serif italic text-5xl text-rose-400 mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 italic">Top players worldwide</p>
        </header>

        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.userId}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {index < 3 ? (
                    <div
                      className={`
                      p-3 rounded-full
                      ${
                        index === 0
                          ? "bg-yellow-50 text-yellow-500"
                          : index === 1
                          ? "bg-gray-50 text-gray-400"
                          : "bg-amber-50 text-amber-700"
                      }
                    `}
                    >
                      <Trophy className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="font-serif italic text-2xl text-gray-400">
                      {index + 1}
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="font-serif italic text-xl mb-1">
                    {entry.username}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      <span>{entry.highScoreSingleplayer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      <span>{entry.totalCardMatchesSingleplayer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Medal className="w-4 h-4" />
                      <span>{entry.longestStreakSingleplayer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
