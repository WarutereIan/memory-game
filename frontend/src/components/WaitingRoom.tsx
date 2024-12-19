import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { socketService } from "../services/socketService";
import { useSocketConnectedStore } from "../store/socketStore";

const WaitingRoom: React.FC = () => {
  const [inputUsername, setInputUsername] = useState("");
  const { gameDetails, setUsername, updateGameDetails, updateGameStarted } =
    useGameStore();
  const { socketConnected, toggleSocketConnected } = useSocketConnectedStore();

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;

    setUsername(inputUsername);
    socketService.startGame(inputUsername);
    socketService.onGameStarted((gameDetails) => {
      updateGameDetails(gameDetails);
      updateGameStarted(true);
    });
  };

  /* if (gameStarted) {
    //navigate to gameboard
  } */

  if (!socketConnected) {
    socketService.connect();

    //load socket listener functions
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

    socketService.onMessageSent((gameDetails) => {
      updateGameDetails(gameDetails);
    });
    toggleSocketConnected(true);
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Waiting Room</h2>
      </div>

      {!gameDetails?.players.includes(inputUsername) ? (
        <form onSubmit={handleJoinGame} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="w-full px-3 py-2 rounded border"
              placeholder="Enter your username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Join Game
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-center">Waiting for other players...</p>
          <div className="flex flex-col gap-2">
            {gameDetails.players.map((player, index) => (
              <div
                key={player}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
              >
                Player {index + 1}: {player}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
