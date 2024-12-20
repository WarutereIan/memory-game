import React, { useEffect } from "react";
import { Users, GamepadIcon, Boxes, Trophy } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { AdminStats as AdminStatsType } from "../../types/admin";

export const AdminStats: React.FC = () => {
  const { stats, isLoading, error, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  if (isLoading) {
    return (
      <div className="text-center font-serif italic text-gray-600">
        Loading admin statistics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-serif italic text-red-500">{error}</div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Online Players"
          value={stats.onlinePlayers}
          icon={<GamepadIcon className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Active Rooms"
          value={stats.activeRooms.length}
          icon={<Boxes className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Total Games"
          value={stats.totalGames.multiplayer + stats.totalGames.singleplayer}
          icon={<Trophy className="w-6 h-6" />}
          color="amber"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Game Distribution */}
        <GameDistribution stats={stats} />

        {/* Quick Actions */}
        {/*  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h3 className="font-serif italic text-xl text-rose-400 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors font-serif italic">
              View All Users
            </button>
            <button className="w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors font-serif italic">
              Manage Game Rooms
            </button>
            <button className="w-full py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors font-serif italic">
              View System Logs
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

// Internal components
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "amber";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-500",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
    amber: "bg-amber-50 text-amber-500",
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
        <h3 className="font-serif italic text-gray-600">{title}</h3>
      </div>
      <p className="text-3xl font-medium">{value.toLocaleString()}</p>
    </div>
  );
};

interface GameDistributionProps {
  stats: AdminStatsType;
}

const GameDistribution: React.FC<GameDistributionProps> = ({ stats }) => {
  const totalGames =
    stats.totalGames.singleplayer + stats.totalGames.multiplayer;
  const calculatePercentage = (value: number) =>
    totalGames === 0 ? 0 : (value / totalGames) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
      <h3 className="font-serif italic text-xl text-rose-400 mb-4">
        Game Distribution
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Singleplayer</span>
            <span>{stats.totalGames.singleplayer.toLocaleString()} games</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-400 transition-all duration-500"
              style={{
                width: `${calculatePercentage(stats.totalGames.singleplayer)}%`,
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Multiplayer</span>
            <span>{stats.totalGames.multiplayer.toLocaleString()} games</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 transition-all duration-500"
              style={{
                width: `${calculatePercentage(stats.totalGames.multiplayer)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
