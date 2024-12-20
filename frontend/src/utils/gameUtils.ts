import { Card } from "../types/game";

export const createDeck = (difficulty: "easy" | "hard"): Card[] => {
  const pairCount = 8;
  const cards: Card[] = [];

  for (let i = 0; i < pairCount; i++) {
    cards.push(
      { id: i * 2, value: i, isFlipped: false, isMatched: false },
      { id: i * 2 + 1, value: i, isFlipped: false, isMatched: false }
    );
  }

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

export const checkCardsMatch = (
  firstCardId: number,
  secondCardId: number
): boolean => {
  // Cards match if their values (not IDs) are the same
  // Since we create pairs with even/odd IDs, we can check if they have the same value
  // by integer dividing their IDs by 2
  return Math.floor(firstCardId / 2) === Math.floor(secondCardId / 2);
};
