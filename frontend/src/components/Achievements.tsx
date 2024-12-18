import React from 'react';
import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Achievements: React.FC = () => {
  const achievements = useGameStore((state) => state.achievements);

  return (
    <div className="fixed bottom-4 left-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={20} />
          <h3 className="font-semibold">Achievements</h3>
        </div>
        <div className="space-y-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-2 p-2 rounded ${
                achievement.unlocked
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <span>{achievement.icon}</span>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;