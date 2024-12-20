import React from "react";
import { useAchievementStore } from "../../store/achievementStore";
import { AchievementCard } from "./AchievementCard";

export const AchievementList: React.FC = () => {
  const { achievements, unlockedAchievements } = useAchievementStore();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          isUnlocked={unlockedAchievements.includes(achievement.id)}
        />
      ))}
    </div>
  );
};
