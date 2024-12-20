import { useState, useEffect, useCallback } from 'react';

interface GameTimerOptions {
  onTimeUp: () => void;
  onScoreMultiplierChange: (multiplier: number) => void;
}

export const useGameTimer = ({ onTimeUp, onScoreMultiplierChange }: GameTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState(300000); // 5 minutes default
  const [totalTime, setTotalTime] = useState(300000);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(300000);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            onTimeUp();
            return 0;
          }

          // Calculate score multiplier based on time remaining
          const multiplier = prevTime / totalTime;
          onScoreMultiplierChange(multiplier);

          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, totalTime, onTimeUp, onScoreMultiplierChange]);

  const startTimer = useCallback(() => {
    setTimeLeft(selectedDuration);
    setTotalTime(selectedDuration);
    setIsRunning(true);
    setIsPaused(false);
  }, [selectedDuration]);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  const setTimerDuration = useCallback((duration: number) => {
    setSelectedDuration(duration);
  }, []);

  return {
    timeLeft,
    totalTime,
    isRunning,
    isPaused,
    selectedDuration,
    startTimer,
    pauseTimer,
    resumeTimer,
    setTimerDuration
  };
};