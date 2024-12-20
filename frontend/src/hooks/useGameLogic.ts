import { useState, useCallback } from 'react';
import { Card as CardType, GameScore } from '../types/game';
import { createDeck } from '../utils/gameUtils';
import { statsService } from '../services/statsService';
import { useAuthStore } from '../store/authStore';

export const useGameLogic = () => {
  const [cards, setCards] = useState<CardType[]>(createDeck('easy'));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameScore, setGameScore] = useState<GameScore>({
    baseScore: 0,
    timeMultiplier: 1,
    finalScore: 0
  });

  const { isAuthenticated } = useAuthStore();

  const handleCardClick = useCallback((cardId: number) => {
    if (isLocked || isGameOver) return;

    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prev => [...prev, cardId]);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards.find(card => card.id === flippedCards[0])!;
      const secondCard = cards.find(card => card.id === cardId)!;

      setTimeout(() => {
        if (firstCard.value === secondCard.value) {
          // Cards match
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setCurrentStreak(prev => prev + 1);
          updateScore(true);

          // Check for game end
          const remainingCards = cards.filter(card => !card.isMatched).length;
          if (remainingCards === 2) {
            handleGameEnd();
          }
        } else {
          // Cards don't match
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setCurrentStreak(0);
          updateScore(false);
        }

        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }
  }, [cards, flippedCards, isLocked, isGameOver]);

  const updateScore = useCallback((isMatch: boolean) => {
    setGameScore(prev => {
      const baseScoreChange = isMatch ? 100 : -50;
      const newBaseScore = Math.max(0, prev.baseScore + baseScoreChange);
      return {
        ...prev,
        baseScore: newBaseScore,
        finalScore: Math.round(newBaseScore * prev.timeMultiplier)
      };
    });
  }, []);

  const handleScoreMultiplierChange = useCallback((multiplier: number) => {
    setGameScore(prev => ({
      ...prev,
      timeMultiplier: multiplier,
      finalScore: Math.round(prev.baseScore * multiplier)
    }));
  }, []);

  const handleGameEnd = useCallback(async () => {
    setIsGameOver(true);
    
    if (isAuthenticated) {
      const gameResult = {
        numOfMatches: Math.floor(gameScore.baseScore / 100),
        numOfMisses: Math.abs(Math.floor(gameScore.baseScore / -50)),
        longestStreak: currentStreak,
        score: gameScore.finalScore
      };

      try {
        await statsService.postSinglePlayerResult(gameResult);
      } catch (error) {
        console.error('Failed to save game results:', error);
      }
    }
  }, [gameScore, currentStreak, isAuthenticated]);

  const handleTimeUp = useCallback(() => {
    setIsGameOver(true);
    handleGameEnd();
  }, [handleGameEnd]);

  const restartGame = useCallback(() => {
    setCards(createDeck('easy'));
    setFlippedCards([]);
    setCurrentStreak(0);
    setIsLocked(false);
    setIsGameOver(false);
    setGameScore({
      baseScore: 0,
      timeMultiplier: 1,
      finalScore: 0
    });
  }, []);

  return {
    cards,
    handleCardClick,
    isLocked,
    isGameOver,
    gameScore,
    currentStreak,
    handleTimeUp,
    handleScoreMultiplierChange,
    restartGame
  };
};