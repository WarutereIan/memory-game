import React from "react";
import { Achievement } from "../../types/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isUnlocked,
}) => (
  <div
    className={`
    bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm
    ${isUnlocked ? "border-2 border-rose-200" : "opacity-75"}
  `}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="text-2xl">{achievement.icon}</div>
      <div>
        <h3 className="font-serif italic text-lg">{achievement.title}</h3>
        <p className="text-sm text-gray-600">{achievement.description}</p>
      </div>
    </div>

    {isUnlocked ? (
      <div className="text-sm text-rose-400 italic">Unlocked! 🎉</div>
    ) : (
      <div className="text-sm text-gray-500 italic">Locked</div>
    )}
  </div>
);
