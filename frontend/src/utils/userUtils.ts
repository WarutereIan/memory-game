const adjectives = [
  "Royal",
  "Noble",
  "Brave",
  "Swift",
  "Wise",
  "Mystic",
  "Golden",
  "Silver",
  "Crystal",
  "Emerald",
];

const nouns = [
  "Knight",
  "Dragon",
  "Phoenix",
  "Wizard",
  "Queen",
  "King",
  "Mage",
  "Sage",
  "Hero",
  "Champion",
];

export const generateUsername = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
};
