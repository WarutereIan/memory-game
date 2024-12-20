import React from 'react';
import { Shield } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

export const AdminHeader: React.FC = () => {
  const { user, logout } = useAdminStore();

  return (
    <header className="flex justify-between items-center mb-12">
      <div className="flex items-center gap-3">
        <Shield className="w-12 h-12 text-rose-400" />
        <div>
          <h1 className="font-serif italic text-4xl text-rose-400">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 italic">
            Welcome back, {user?.username}
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors font-serif italic"
      >
        Logout
      </button>
    </header>
  );
};