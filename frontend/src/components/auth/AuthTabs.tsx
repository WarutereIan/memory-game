import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthTabsProps {
  isLogin: boolean;
  onTabChange: (isLogin: boolean) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ isLogin, onTabChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-xl overflow-hidden border border-rose-200">
        <button
          className={`
            px-6 py-3 flex items-center gap-2 font-serif italic transition-colors
            ${isLogin
              ? 'bg-rose-400 text-white'
              : 'bg-white/50 text-gray-600 hover:bg-white'
            }
          `}
          onClick={() => onTabChange(true)}
        >
          <LogIn className="w-4 h-4" />
          <span>Login</span>
        </button>
        <button
          className={`
            px-6 py-3 flex items-center gap-2 font-serif italic transition-colors
            ${!isLogin
              ? 'bg-rose-400 text-white'
              : 'bg-white/50 text-gray-600 hover:bg-white'
            }
          `}
          onClick={() => onTabChange(false)}
        >
          <UserPlus className="w-4 h-4" />
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default AuthTabs