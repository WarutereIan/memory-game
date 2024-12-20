import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { LoginData } from '../../types/auth';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(formData);
      setUser({
        username: response._user.username,
        email: formData.email,
      });
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        className="w-full py-3 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors flex items-center justify-center gap-2"
      >
        <LogIn className="w-4 h-4" />
        <span className="font-serif italic">Login</span>
      </button>
    </form>
  );
};

export default LoginForm