export const createDeck = (difficulty: 'easy' | 'hard'): Card[] => {
  const pairCount = difficulty === 'easy' ? 18 : 36;
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