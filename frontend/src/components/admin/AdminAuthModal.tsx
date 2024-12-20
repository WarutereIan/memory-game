import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Shield } from 'lucide-react';
import AdminLoginForm from './AdminLoginForm';
import AdminSignUpForm from './AdminSignUpForm';
import AuthTabs from '../auth/AuthTabs';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ 
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
            <Shield className="w-12 h-12 text-rose-400" />
          </div>
          <h2 className="font-serif italic text-2xl text-rose-400">
            Admin Access
          </h2>
          <p className="text-sm text-gray-600 italic">
            Secure administration panel login
          </p>
        </div>
        
        <AuthTabs 
          isLogin={activeTab === 'login'} 
          onTabChange={(isLogin) => {
            setActiveTab(isLogin ? 'login' : 'signup');
          }} 
        />

        {activeTab === 'login' ? (
          <AdminLoginForm onSuccess={onClose} />
        ) : (
          <AdminSignUpForm onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};