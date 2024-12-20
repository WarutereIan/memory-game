import React from 'react';
import { CardTheme } from '../../../types/game';

interface SideControlsProps {
  position: 'left' | 'right';
  score: number;
  streak: number;
  theme: CardTheme;
  onThemeChange: (theme: CardTheme) => void;
}

export const SideControls: React.FC<SideControlsProps> = ({
  position,
  score,
  streak,
  theme,
  onThemeChange
}) => {
  return (
    <div className="hidden lg:block w-48 space-y-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
        <h3 className="font-serif text-rose-400 mb-2">
          {position === 'left' ? 'Score' : 'Streak'}
        </h3>
        <p className="text-2xl font-medium">
          {position === 'left' ? score : streak}
        </p>
      </div>

      {position === 'right' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
          <h3 className="font-serif text-rose-400 mb-2">Theme</h3>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as CardTheme)}
            className="w-full p-2 rounded border border-rose-200 focus:border-rose-400 outline-none"
          >
            <option value="princess">Princess</option>
            <option value="fantasy">Fantasy</option>
            <option value="nature">Nature</option>
          </select>
        </div>
      )}
    </div>
  );
};