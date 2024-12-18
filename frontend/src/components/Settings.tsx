import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { colorTheme, language, cardTheme, setColorTheme, setLanguage, setCardTheme } = useGameStore();

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <button
        onClick={() => setColorTheme(colorTheme === 'light' ? 'dark' : 'light')}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {colorTheme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </button>
      
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="px-2 py-1 rounded border dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>

      <select
        value={cardTheme}
        onChange={(e) => setCardTheme(e.target.value as any)}
        className="px-2 py-1 rounded border dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="numbers">{t('themes.numbers')}</option>
        <option value="emojis">{t('themes.emojis')}</option>
        <option value="flags">{t('themes.flags')}</option>
        <option value="custom">{t('themes.custom')}</option>
      </select>
    </div>
  );
};

export default Settings;