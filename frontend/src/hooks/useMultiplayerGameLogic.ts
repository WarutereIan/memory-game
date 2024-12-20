import { useState, useCallback } from "react";
import { socketService } from "../services/socketService";
import { useGameStore } from "../store/gameStore";
import { updatePlayerScore } from "../utils/multiplayerScoring";
import { checkCardsMatch } from "../utils/gameUtils";

export const useMultiplayerGameLogic = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const { gameDetails, username } = useGameStore();

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (!gameDetails || gameDetails.currentPlayerTurn !== username) return;

      setSelectedCards((prev) => {
        const newSelected = [...prev, cardId];

        if (newSelected.length === 2) {
          const [firstCard, secondCard] = newSelected;
          const isMatch = checkCardsMatch(firstCard, secondCard);
          const currentPlayerScore = gameDetails.currentPlayerScores.find(
            (score) => score.username === username
          )!;

          if (isMatch) {
            const updatedScore = updatePlayerScore(
              currentPlayerScore,
              scoreMultiplier
            );
            socketService.matchedCards(
              username,
              updatedScore,
              gameDetails.validCards.filter(
                (id) => id !== firstCard && id !== secondCard
              ),
              newSelected
            );
          } else {
            socketService.changeTurn(username, newSelected);
          }

          return [];
        }

        return newSelected;
      });
    },
    [gameDetails, username, scoreMultiplier]
  );

  const isCardFlipped = useCallback(
    (cardId: number) => {
      return (
        selectedCards.includes(cardId) ||
        !gameDetails?.validCards.includes(cardId)
      );
    },
    [gameDetails, selectedCards]
  );

  const isCardDisabled = useCallback(() => {
    return (
      !gameDetails ||
      gameDetails.currentPlayerTurn !== username ||
      selectedCards.length === 2
    );
  }, [gameDetails, username, selectedCards]);

  const handleMultiplayerTimeUp = useCallback(() => {
    if (!gameDetails || !username) return;
    socketService.stopTimer(username);
  }, [gameDetails, username]);

  const handleMultiplayerScoreMultiplier = useCallback((multiplier: number) => {
    setScoreMultiplier(multiplier);
  }, []);

  const getCurrentPlayerScore = useCallback(() => {
    if (!gameDetails || !username) return 0;
    const playerScore = gameDetails.currentPlayerScores.find(
      (score) => score.username === username
    );
    return playerScore
      ? playerScore.correctPairsMatched * 100 * scoreMultiplier
      : 0;
  }, [gameDetails, username, scoreMultiplier]);

  const getCurrentPlayerStreak = useCallback(() => {
    if (!gameDetails || !username) return 0;
    const playerScore = gameDetails.currentPlayerScores.find(
      (score) => score.username === username
    );
    return playerScore ? playerScore.currentStreak : 0;
  }, [gameDetails, username]);

  return {
    handleCardClick,
    isCardFlipped,
    isCardDisabled,
    handleMultiplayerTimeUp,
    handleMultiplayerScoreMultiplier,
    currentScore: getCurrentPlayerScore(),
    currentPlayerStreak: getCurrentPlayerStreak(),
  };
};
