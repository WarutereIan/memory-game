import React, { useState } from 'react';
import { Shield, LogIn } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useAdminStore } from '../../store/adminStore';
import { AdminLoginData } from '../../types/admin';

export const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<AdminLoginData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const setUser = useAdminStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await adminService.login(formData);
      setUser(user);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-rose-50/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-rose-400" />
          </div>
          <h1 className="font-serif italic text-4xl text-rose-400 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 italic">
            Access the game administration panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm italic">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-serif italic mb-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-serif italic mb-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 font-serif italic"
          >
            <LogIn className="w-4 h-4" />
            <span>Login to Admin Panel</span>
          </button>
        </form>
      </div>
    </div>
  );
};