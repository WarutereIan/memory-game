import { io, Socket } from "socket.io-client";
import { GameDetails, PlayerScore } from "../types/socket";
import { useGameStore } from "../store/gameStore";

class SocketService {
  private socket: Socket | null = null;
  private roomID: string | null = null;

  connect() {
    this.socket = io(import.meta.env.VITE_SOCKET_URL);

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) {
      console.log("no socket");
      return;
    }

    this.socket.on("gameStarting", (data: { roomId: string; players: [] }) => {
      console.log(data);

      if (!this.socket) return;

      console.log("gameStart");

      this.roomID = data.roomId;
      console.log(this.roomID);

      this.socket.emit("gameStartingAck", { id: data.roomId });
    });
  }

  startGame(username: string) {
    console.log(this.roomID);
    if (!this.socket || !this.roomID) return;

    this.socket.emit("start game", {
      username,
      roomID: this.roomID,
    });
  }

  startTimer(username: string) {
    if (!this.socket || !this.roomID) return;

    this.socket.emit("start timer", {
      username,
      roomID: this.roomID,
    });
  }

  stopTimer(username: string) {
    if (!this.socket || !this.roomID) return;

    this.socket.emit("stop timer", {
      username,
      roomID: this.roomID,
    });
  }

  changeTurn(username: string, cardsChosen: number[]) {
    if (!this.socket || !this.roomID) return;

    this.socket.emit("change turn", {
      username,
      roomID: this.roomID,
      cardsChosen,
    });
  }

  matchedCards(
    username: string,
    playerScore: PlayerScore,
    validCardsRemaining: number[],
    cardsChosen: number[]
  ) {
    if (!this.socket || !this.roomID) return;

    this.socket.emit("matched cards", {
      username,
      roomID: this.roomID,
      player_score: playerScore,
      validCardsRemaining,
      cardsChosen,
    });
  }

  sendMessage(username: string, message: string) {
    if (!this.socket || !this.roomID) return;

    this.socket.emit("send message", {
      username,
      message,
      timeSent: new Date().toISOString(),
      roomID: this.roomID,
    });
  }

  onGameStarted(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("game started", callback);
  }

  onTimerStarted(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("timer started", callback);
  }

  onTimerStopped(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("timer stopped", callback);
  }

  onTurnChanged(
    callback: (
      gameDetails: GameDetails,
      data: { cardsChosen: number[] }
    ) => void
  ) {
    if (!this.socket) return;
    this.socket.on("turn changed", callback);
  }

  onCardsMatched(
    callback: (
      gameDetails: GameDetails,
      data: { cardsChosen: number[] }
    ) => void
  ) {
    if (!this.socket) return;
    this.socket.on("cards matched", callback);
  }

  onMessageSent(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("message sent", callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
