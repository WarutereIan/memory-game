import React from "react";

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  onRestart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl max-w-sm w-full mx-4">
        <h2 className="font-serif italic text-3xl text-rose-400 text-center mb-4">
          Game Over!
        </h2>
        <p className="text-xl text-center mb-6">Final Score: {score}</p>
        <button
          onClick={onRestart}
          className="w-full py-3 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-colors font-serif italic"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
