import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  return (
    <div
      onClick={() => !disabled && !card.isMatched && !card.isFlipped && onClick()}
      className={`
        relative w-16 h-24 cursor-pointer transform transition-transform duration-300
        ${!disabled && !card.isMatched && !card.isFlipped ? 'hover:scale-105' : ''}
      `}
    >
      <div
        className={`
          absolute w-full h-full transition-transform duration-500 transform-gpu
          ${card.isFlipped ? 'rotate-y-180' : ''}
          preserve-3d
        `}
      >
        {/* Front of card */}
        <div className={`
          absolute w-full h-full bg-white rounded-lg border-2 border-blue-500
          flex items-center justify-center text-2xl font-bold text-blue-600
          backface-hidden ${card.isMatched ? 'opacity-0' : ''}
        `}>
          {card.isFlipped ? card.value + 1 : '?'}
        </div>
        
        {/* Back of card */}
        <div className={`
          absolute w-full h-full bg-gradient-to-br from-blue-400 to-blue-600
          rounded-lg rotate-y-180 backface-hidden
          ${card.isMatched ? 'opacity-0' : ''}
        `} />
      </div>
    </div>
  );
};

export default Card;