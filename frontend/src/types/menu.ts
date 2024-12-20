import { ReactNode } from 'react';

export interface MenuItem {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  requiresAuth: boolean;
}