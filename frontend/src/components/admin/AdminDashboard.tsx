import React, { useEffect } from 'react';
import { Users, GamepadIcon, Boxes, Trophy } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { AdminStatCard } from './AdminStatCard';
import { AdminHeader } from './AdminHeader';

export const AdminDashboard: React.FC = () => {
  const { stats, fetchStats, isLoading, error } = useAdminStore();

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchStats]);

  if (isLoading) {
    return (
      <div className="text-center font-serif italic text-gray-600">
        Loading admin dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-serif italic text-red-500">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-rose-50/30 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <AdminHeader />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="w-6 h-6" />}
            color="blue"
          />
          <AdminStatCard
            title="Online Players"
            value={stats.onlinePlayers}
            icon={<GamepadIcon className="w-6 h-6" />}
            color="green"
          />
          <AdminStatCard
            title="Active Rooms"
            value={stats.activeRooms}
            icon={<Boxes className="w-6 h-6" />}
            color="purple"
          />
          <AdminStatCard
            title="Total Games"
            value={stats.totalGames.multiplayer + stats.totalGames.singleplayer}
            icon={<Trophy className="w-6 h-6" />}
            color="amber"
          />
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <h3 className="font-serif italic text-xl text-rose-400 mb-4">
              Game Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Singleplayer</span>
                  <span>{stats.totalGames.singleplayer} games</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-400"
                    style={{ 
                      width: `${(stats.totalGames.singleplayer / (stats.totalGames.singleplayer + stats.totalGames.multiplayer)) * 100}%` 
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Multiplayer</span>
                  <span>{stats.totalGames.multiplayer} games</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400"
                    style={{ 
                      width: `${(stats.totalGames.multiplayer / (stats.totalGames.singleplayer + stats.totalGames.multiplayer)) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
};