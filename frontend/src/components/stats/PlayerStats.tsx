import React, { useEffect, useState } from "react";
import { Trophy, Zap, Crown, Users, Target, Award, Medal } from "lucide-react";
import { useStatsStore } from "../../store/statsStore";
import { useAchievementStore } from "../../store/achievementStore";
import { StatCard } from "./StatCard";
import { AchievementList } from "../achievements/AchievementList";
import { AchievementNotification } from "../achievements/AchievementNotification";
import { HomeButton } from "../ui/HomeButton";

const PlayerStats: React.FC = () => {
  const { playerStats, fetchPlayerStats, isLoading, error } = useStatsStore();
  const { checkAchievements, achievements, unlockedAchievements } =
    useAchievementStore();
  const [showStats, setShowStats] = useState(true);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayerStats();
  }, [fetchPlayerStats]);

  useEffect(() => {
    if (playerStats) {
      const previousUnlocked = unlockedAchievements.length;
      checkAchievements(playerStats);

      // Check if any new achievements were unlocked
      if (unlockedAchievements.length > previousUnlocked) {
        const lastUnlocked =
          unlockedAchievements[unlockedAchievements.length - 1];
        setNewAchievement(lastUnlocked);
      }
    }
  }, [playerStats, checkAchievements]);

  if (isLoading) {
    return (
      <div className="text-center font-serif italic text-gray-600">
        Loading stats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-serif italic text-red-500">{error}</div>
    );
  }

  if (!playerStats) return null;

  return (
    <div className="min-h-screen bg-rose-50/30 px-4 py-8">
      <HomeButton />
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-serif italic text-5xl text-rose-400 mb-2">
            Your Progress
          </h1>
          <p className="text-gray-600 italic">
            Track your achievements and statistics
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowStats(true)}
            className={`px-6 py-2 rounded-full font-serif italic transition-colors ${
              showStats
                ? "bg-rose-400 text-white"
                : "bg-white/50 text-gray-600 hover:bg-white"
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setShowStats(false)}
            className={`px-6 py-2 rounded-full font-serif italic transition-colors ${
              !showStats
                ? "bg-rose-400 text-white"
                : "bg-white/50 text-gray-600 hover:bg-white"
            }`}
          >
            Achievements
          </button>
        </div>

        {showStats ? (
          <div className="grid gap-6">
            <div>
              <h2 className="font-serif italic text-2xl text-rose-400 mb-4">
                Single Player
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  icon={<Trophy className="w-5 h-5" />}
                  title="Best Score"
                  value={playerStats.highScoreSingleplayer}
                />
                <StatCard
                  icon={<Target className="w-5 h-5" />}
                  title="Total Matches"
                  value={playerStats.totalCardMatchesSingleplayer}
                />
                <StatCard
                  icon={<Zap className="w-5 h-5" />}
                  title="Best Streak"
                  value={playerStats.longestStreakSingleplayer}
                />
              </div>
            </div>

            <div>
              <h2 className="font-serif italic text-2xl text-rose-400 mb-4">
                Multiplayer
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  icon={<Crown className="w-5 h-5" />}
                  title="Best Score"
                  value={playerStats.highScoreMultiplayer}
                />
                <StatCard
                  icon={<Users className="w-5 h-5" />}
                  title="Games Played"
                  value={playerStats.numOfGamesMultiplayer}
                />
                <StatCard
                  icon={<Award className="w-5 h-5" />}
                  title="Best Streak"
                  value={playerStats.longestStreakMultiplayer}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-rose-50 rounded-full text-rose-400">
                <Medal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif italic text-2xl text-rose-400">
                  Achievements
                </h2>
                <p className="text-sm text-gray-600">
                  {unlockedAchievements.length} of {achievements.length}{" "}
                  unlocked
                </p>
              </div>
            </div>
            <AchievementList />
          </div>
        )}

        {newAchievement && (
          <AchievementNotification
            achievement={achievements.find((a) => a.id === newAchievement)!}
            onClose={() => setNewAchievement(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerStats;
