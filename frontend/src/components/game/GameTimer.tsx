import React from 'react';
import { Timer, Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';
import { useGameTimer } from '../../hooks/useGameTimer';

interface GameTimerProps {
  onTimeUp: () => void;
  onScoreMultiplierChange: (multiplier: number) => void;
}

export const GameTimer: React.FC<GameTimerProps> = ({ 
  onTimeUp,
  onScoreMultiplierChange 
}) => {
  const {
    timeLeft,
    totalTime,
    isRunning,
    isPaused,
    selectedDuration,
    startTimer,
    pauseTimer,
    resumeTimer,
    setTimerDuration
  } = useGameTimer({
    onTimeUp,
    onScoreMultiplierChange
  });

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const timePercentage = (timeLeft / totalTime) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          <h3 className="font-semibold">Game Timer</h3>
        </div>
        {!isRunning && !isPaused && (
          <select
            value={selectedDuration}
            onChange={(e) => setTimerDuration(Number(e.target.value))}
            className="px-3 py-2 rounded border dark:bg-gray-700 w-full sm:w-auto"
          >
            <option value={180000}>3 minutes</option>
            <option value={300000}>5 minutes</option>
            <option value={600000}>10 minutes</option>
          </select>
        )}
      </div>

      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
        <div
          className="absolute h-full bg-blue-500 rounded-full transition-all duration-1000"
          style={{ width: `${timePercentage}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
        <Button 
          onClick={!isRunning && !isPaused ? startTimer : (isPaused ? resumeTimer : pauseTimer)}
          className="w-full sm:w-auto"
        >
          {!isRunning && !isPaused ? (
            <Play className="w-4 h-4 mr-2" />
          ) : (
            isPaused ? (
              <Play className="w-4 h-4 mr-2" />
            ) : (
              <Pause className="w-4 h-4 mr-2" />
            )
          )}
          {!isRunning && !isPaused ? 'Start Timer' : (isPaused ? 'Resume' : 'Pause')}
        </Button>
      </div>
    </div>
  );
};