import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultAuthTab, setDefaultAuthTab] = useState<'login' | 'signup'>('login');

  const openAuthModal = useCallback((tab: 'login' | 'signup' = 'login') => {
    setDefaultAuthTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  return {
    isAuthModalOpen,
    defaultAuthTab,
    openAuthModal,
    closeAuthModal,
  };
};