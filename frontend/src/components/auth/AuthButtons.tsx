import React from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '../../store/authStore';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal } from './AuthModal';

export const AuthButtons: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isAuthModalOpen, defaultAuthTab, openAuthModal, closeAuthModal } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm">Welcome, {user.username}</span>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => openAuthModal('signup')}>
          Sign Up
        </Button>
        <Button onClick={() => openAuthModal('login')}>
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultTab={defaultAuthTab}
      />
    </>
  );
};