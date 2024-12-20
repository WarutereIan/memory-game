import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Crown } from 'lucide-react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AuthTabs from './AuthTabs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'login' 
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Crown className="w-12 h-12 text-rose-400" />
          </div>
          <h2 className="font-serif italic text-2xl text-rose-400">
            Welcome to Memória
          </h2>
        </div>
        
        <AuthTabs 
          isLogin={activeTab === 'login'} 
          onTabChange={(isLogin) => {
            setActiveTab(isLogin ? 'login' : 'signup');
          }} 
        />

        {activeTab === 'login' ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <SignUpForm onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};