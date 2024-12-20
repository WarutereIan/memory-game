import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "./Card";
import { BottomTimer } from "./controls/BottomTimer";
import { GameHeader } from "./GameHeader";
import { GameOverModal } from "./GameOverModal";
import GameChat from "../GameChat";
import { CardTheme } from "../../types/game";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useMultiplayerGameLogic } from "../../hooks/useMultiplayerGameLogic";
import { useGameStore } from "../../store/gameStore";
import { Trophy, Zap } from "lucide-react";
import { HomeButton } from "../ui/HomeButton";

const GameBoard: React.FC = () => {
  const [theme, setTheme] = useState<CardTheme>("princess");
  const location = useLocation();
  const isMultiplayer = location.pathname.includes("multiplayer");
  const { gameDetails } = useGameStore();

  const {
    cards,
    handleCardClick,
    isLocked,
    isGameOver,
    gameScore,
    currentStreak,
    handleTimeUp,
    handleScoreMultiplierChange,
    restartGame,
  } = useGameLogic();

  const {
    handleCardClick: handleMultiplayerCardClick,
    isCardFlipped,
    isCardDisabled,
    handleMultiplayerTimeUp,
    handleMultiplayerScoreMultiplier,
    currentScore,
    currentPlayerStreak,
  } = useMultiplayerGameLogic();

  return (
    <div className="min-h-screen bg-rose-50/30 px-4 py-8">
      <HomeButton />
      <GameHeader />

      <div className="max-w-7xl mx-auto grid grid-cols-[300px_1fr] gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Score Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-rose-400" />
                  <span className="text-sm text-gray-600">Score</span>
                </div>
                <p className="text-2xl font-medium">
                  {isMultiplayer ? currentScore : gameScore.finalScore}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-rose-400" />
                  <span className="text-sm text-gray-600">Streak</span>
                </div>
                <p className="text-2xl font-medium">
                  {isMultiplayer ? currentPlayerStreak : currentStreak}
                </p>
              </div>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-sm">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as CardTheme)}
              className="w-full p-2 rounded-lg border border-rose-200 focus:border-rose-400 outline-none font-serif italic"
            >
              <option value="princess">Princess Theme</option>
              <option value="fantasy">Fantasy Theme</option>
              <option value="nature">Nature Theme</option>
            </select>
          </div>

          {isMultiplayer && <GameChat />}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-4 justify-items-center">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={{
                ...card,
                isFlipped: isMultiplayer
                  ? isCardFlipped(card.id)
                  : card.isFlipped,
                isMatched: isMultiplayer
                  ? !gameDetails?.validCards.includes(card.id)
                  : card.isMatched,
              }}
              theme={theme}
              onClick={() => {
                if (isMultiplayer) {
                  handleMultiplayerCardClick(card.id);
                } else {
                  handleCardClick(card.id);
                }
              }}
              disabled={
                isMultiplayer ? isCardDisabled() : isLocked || isGameOver
              }
            />
          ))}
        </div>
      </div>

      <BottomTimer
        onTimeUp={isMultiplayer ? handleMultiplayerTimeUp : handleTimeUp}
        onScoreMultiplierChange={
          isMultiplayer
            ? handleMultiplayerScoreMultiplier
            : handleScoreMultiplierChange
        }
      />

      {!isMultiplayer && (
        <GameOverModal
          isOpen={isGameOver}
          score={gameScore.finalScore}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
