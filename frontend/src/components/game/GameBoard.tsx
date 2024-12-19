import React, { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { useAuthStore } from "../../store/authStore";
import { statsService } from "../../services/statsService";
import { socketService } from "../../services/socketService";
import Card from "./Card";
import GameStats from "./GameStats";
import { createDeck } from "../../utils/gameUtils";
import { Card as CardType } from "../../types/game";

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [gameStats, setGameStats] = useState({
    turns: 0,
    matches: 0,
  });

  const { gameDetails, username } = useGameStore();
  const isMultiplayer = !!gameDetails;
  const isMyTurn = gameDetails?.currentPlayerTurn == username;

  useEffect(() => {
    console.log(isMyTurn);
  }, [gameDetails]);

  useEffect(() => {
    const difficulty = isMultiplayer ? "hard" : "easy";
    setCards(createDeck(difficulty));
    setStartTime(Date.now());
  }, [isMultiplayer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleCardClick = (cardId: number) => {
    if (isLocked || (isMultiplayer && !isMyTurn)) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, cardId]);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards.find((card) => card.id === flippedCards[0])!;
      const secondCard = cards.find((card) => card.id === cardId)!;

      setTimeout(() => {
        if (firstCard.value === secondCard.value) {
          //cards match
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setCurrentStreak((prev) => prev + 1);
          setGameStats((prev) => ({
            ...prev,
            matches: prev.matches + 1,
          }));

          if (isMultiplayer) {
            socketService.matchedCards(
              username,
              {
                username,
                currentStreak: currentStreak + 1,
                correctPairsMatched: gameStats.matches + 1,
                misses: gameStats.turns - gameStats.matches,
                longestStreak: currentStreak + 1,
              },
              cards.filter((card) => !card.isMatched).map((card) => card.id),
              [firstCard.id, secondCard.id]
            );
          }
        } else {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setCurrentStreak(0);

          if (isMultiplayer) {
            socketService.changeTurn(username, [firstCard.id, secondCard.id]);
          }
        }

        setFlippedCards([]);
        setIsLocked(false);
        setGameStats((prev) => ({ ...prev, turns: prev.turns + 1 }));

        // Check for game end
        const remainingCards = cards.filter((card) => !card.isMatched).length;
        if (remainingCards === 2) {
          handleGameEnd();
        }
      }, 1000);
    }
  };

  const handleGameEnd = async () => {
    const finalStats = {
      ...gameStats,
      endTime: Date.now(),
      startTime,
    };

    const gameResult = {
      numOfMatches: gameStats.matches,
      numOfMisses: gameStats.turns - gameStats.matches,
      longestStreak: currentStreak,
      score: gameStats.turns,
    };

    try {
      if (isMultiplayer) {
        await statsService.postMultiPlayerResult(gameResult);
      } else {
        await statsService.postSinglePlayerResult(gameResult);
      }
    } catch (error) {
      console.error("Failed to save game results:", error);
    }
  };

  return (
    <div className="space-y-6">
      <GameStats
        turns={gameStats.turns}
        matches={gameStats.matches}
        currentStreak={currentStreak}
        elapsedTime={elapsedTime}
      />

      <div
        className={`grid ${
          isMultiplayer ? "grid-cols-9" : "grid-cols-6"
        } gap-2 justify-items-center`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
            disabled={isLocked || (isMultiplayer && !isMyTurn)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
