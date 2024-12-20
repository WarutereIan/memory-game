import React from 'react';
import { useGameTimer } from '../../../hooks/useGameTimer';

interface BottomTimerProps {
  onTimeUp: () => void;
  onScoreMultiplierChange: (multiplier: number) => void;
}

export const BottomTimer: React.FC<BottomTimerProps> = ({
  onTimeUp,
  onScoreMultiplierChange
}) => {
  const {
    timeLeft,
    totalTime,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer
  } = useGameTimer({
    onTimeUp,
    onScoreMultiplierChange
  });

  const timePercentage = (timeLeft / totalTime) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-serif text-rose-400">
            Time Remaining
          </span>
          <button
            onClick={!isRunning ? startTimer : (isPaused ? resumeTimer : pauseTimer)}
            className="px-4 py-1 rounded-full bg-rose-400 text-white text-sm hover:bg-rose-500 transition-colors"
          >
            {!isRunning ? 'Start' : (isPaused ? 'Resume' : 'Pause')}
          </button>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-400 transition-all duration-1000"
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};