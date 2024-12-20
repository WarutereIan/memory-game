import React from "react";
import { Achievement } from "../../types/achievements";

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementNotification: React.FC<
  AchievementNotificationProps
> = ({ achievement, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-slide-in">
    <div className="flex items-center gap-3">
      <div className="text-3xl">{achievement.icon}</div>
      <div>
        <h4 className="font-serif italic text-lg text-rose-400">
          Achievement Unlocked!
        </h4>
        <p className="font-medium">{achievement.title}</p>
        <p className="text-sm text-gray-600">{achievement.description}</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
    >
      ×
    </button>
  </div>
);
