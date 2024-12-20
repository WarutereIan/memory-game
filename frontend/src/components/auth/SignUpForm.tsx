import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { SignUpData } from '../../types/auth';
import { z } from 'zod';

const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<SignUpData>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState<string>('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const validatedData = signUpSchema.parse(formData);
      const response = await authService.signup(validatedData);
      setUser({
        username: response._user.username,
        email: formData.email,
      });
      onSuccess?.();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
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
          Username
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          required
        />
      </div>

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

      <div>
        <label className="block text-sm font-serif italic mb-1 text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          value={formData.confirm_password}
          onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors flex items-center justify-center gap-2"
      >
        <UserPlus className="w-4 h-4" />
        <span className="font-serif italic">Sign Up</span>
      </button>
    </form>
  );
};

export default SignUpForm