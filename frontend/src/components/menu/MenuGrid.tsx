import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, Trophy, BarChart2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MenuItem } from '../../types/menu';

export const MenuGrid: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const menuItems: MenuItem[] = [
    {
      title: 'Single Player',
      icon: <User className="w-5 h-5" />,
      onClick: () => navigate('/singleplayer'),
      requiresAuth: false
    },
    {
      title: 'Multiplayer',
      icon: <Users className="w-5 h-5" />,
      onClick: () => navigate('/multiplayer'),
      requiresAuth: true
    },
    {
      title: 'My Stats',
      icon: <BarChart2 className="w-5 h-5" />,
      onClick: () => navigate('/stats'),
      requiresAuth: true
    },
    {
      title: 'Leaderboards',
      icon: <Trophy className="w-5 h-5" />,
      onClick: () => navigate('/leaderboard'),
      requiresAuth: false
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Game Modes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Button
            key={item.title}
            variant={item.requiresAuth && !isAuthenticated ? "secondary" : "default"}
            className="h-16 text-lg justify-start gap-3 w-full"
            onClick={item.onClick}
            disabled={item.requiresAuth && !isAuthenticated}
          >
            {item.icon}
            {item.title}
            {item.requiresAuth && !isAuthenticated && (
              <span className="ml-auto text-xs opacity-70">Login Required</span>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};