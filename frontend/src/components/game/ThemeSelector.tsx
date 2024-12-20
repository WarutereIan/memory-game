import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '../ui/button';
import { CardTheme } from '../../types/game';
import { cardThemes } from '../../utils/cardThemes';

interface ThemeSelectorProps {
  currentTheme: CardTheme;
  onThemeChange: (theme: CardTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-5 h-5" />
        <h3 className="font-semibold">Card Theme</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(cardThemes) as CardTheme[]).map((theme) => (
          <Button
            key={theme}
            variant={currentTheme === theme ? "default" : "outline"}
            className="capitalize h-12 text-sm sm:text-base"
            onClick={() => onThemeChange(theme)}
          >
            {theme === currentTheme && (
              <span className="mr-2">
                {cardThemes[theme][0]}
              </span>
            )}
            {theme}
          </Button>
        ))}
      </div>
    </div>
  );
};