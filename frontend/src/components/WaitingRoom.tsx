import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, User, Wifi, WifiOff } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { socketService } from "../services/socketService";
import { useSocketConnectedStore } from "../store/socketStore";
import { generateUsername } from "../utils/userUtils";
import { createDeck } from "../utils/gameUtils";
import { HomeButton } from "./ui/HomeButton";

const WaitingRoom: React.FC = () => {
  const navigate = useNavigate();
  const { gameDetails, setUsername, updateGameDetails, updateGameStarted } =
    useGameStore();
  const { socketConnected, toggleSocketConnected } = useSocketConnectedStore();

  const setupSocketListeners = () => {
    socketService.onGameStarting(() => {
      const username = generateUsername();
      setUsername(username);

      const initialCards = createDeck("easy");
      const initialValidCards = initialCards.map((card) => card.id);
      socketService.startGame(username, initialValidCards);
    });

    socketService.onGameStarted((gameDetails) => {
      updateGameDetails(gameDetails);
      updateGameStarted(true);
    });

    socketService.onTurnChanged((gameDetails) => {
      updateGameDetails(gameDetails);
    });

    socketService.onCardsMatched((gameDetails) => {
      updateGameDetails(gameDetails);
    });

    socketService.onMessageSent((gameDetails) => {
      updateGameDetails(gameDetails);
    });

    socketService.onTimerStarted((gameDetails) => {
      updateGameDetails(gameDetails);
    });

    socketService.onTimerStopped((gameDetails) => {
      updateGameDetails(gameDetails);
    });
  };

  if (!socketConnected) {
    socketService.connect();
    setupSocketListeners();
    toggleSocketConnected(true);
  }

  if (gameDetails) {
    navigate("/multiplayer/game");
  }

  return (
    <div className="min-h-screen bg-rose-50/30 flex items-center justify-center px-4">
      <HomeButton />
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm text-center">
          <Crown className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="font-serif italic text-2xl text-rose-400 mb-2">
            Finding Players
          </h2>

          <div
            className={`flex items-center justify-center gap-2 mb-4 ${
              socketConnected ? "text-green-500" : "text-red-500"
            }`}
          >
            {socketConnected ? (
              <>
                <Wifi className="w-4 h-4" />
                <span className="text-sm italic">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span className="text-sm italic">Disconnected</span>
              </>
            )}
          </div>

          {gameDetails ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600 italic">
                  Players joined ({gameDetails.players.length}/2)
                </p>
                {gameDetails.players.length < 2 && (
                  <p className="text-sm text-gray-500 italic mt-2">
                    Waiting for more players to join...
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {gameDetails.players.map((player) => (
                  <div
                    key={player}
                    className="bg-rose-50 rounded-lg p-3 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-rose-400" />
                    <span className="font-serif italic text-rose-400">
                      {player}
                    </span>
                  </div>
                ))}
                {gameDetails.players.length < 2 && (
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                    <div className="w-4 h-4" />
                    <span className="font-serif italic text-gray-400">
                      Waiting for players...
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-400 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
