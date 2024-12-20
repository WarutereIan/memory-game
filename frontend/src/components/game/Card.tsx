import React from 'react';
import { Card as CardType, CardTheme } from '../../types/game';
import { cardThemes } from '../../utils/cardThemes';

interface CardProps {
  card: CardType;
  theme: CardTheme;
  onClick: () => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, theme, onClick, disabled }) => {
  return (
    <div
      onClick={() => !disabled && !card.isMatched && !card.isFlipped && onClick()}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 cursor-pointer 
        transform transition-transform duration-300 touch-manipulation
        ${!disabled && !card.isMatched && !card.isFlipped ? 'hover:scale-105 active:scale-95' : ''}
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
          absolute w-full h-full rounded-full
          bg-white border-2 border-rose-200
          flex items-center justify-center text-2xl
          backface-hidden ${card.isMatched ? 'opacity-0' : ''}
          shadow-sm
        `}>
          {card.isFlipped ? cardThemes[theme][card.value] : '?'}
        </div>
        
        {/* Back of card */}
        <div className={`
          absolute w-full h-full rounded-full
          bg-gradient-to-br from-rose-200 to-rose-300
          rotate-y-180 backface-hidden shadow-sm
          ${card.isMatched ? 'opacity-0' : ''}
        `} />
      </div>
    </div>
  );
};