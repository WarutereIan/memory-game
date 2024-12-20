import { io, Socket } from "socket.io-client";
import {
  GameDetails,
  PlayerScore,
  GameStartMessage,
  TimerMessage,
  TurnChangeMessage,
  MatchedCardsMessage,
  ChatMessage,
} from "../types/socket";

class SocketService {
  private socket: Socket | null = null;
  private roomID: string | null = null;

  connect() {
    this.socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to game server");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }

  onGameStarting(callback: () => void) {
    if (!this.socket) return;
    this.socket.on(
      "gameStarting",
      (data: { roomId: string; players: string[] }) => {
        this.roomID = data.roomId;
        callback();
      }
    );
  }

  // Game initialization
  startGame(username: string, initialValidCards: number[]) {
    if (!this.socket || !this.roomID) return;

    const message: GameStartMessage = {
      username,
      roomID: this.roomID,
      validCardsRemaining: initialValidCards,
    };
    this.socket.emit("start game", message);
  }

  // Timer controls
  startTimer(username: string) {
    if (!this.socket || !this.roomID) return;

    const message: TimerMessage = {
      username,
      roomID: this.roomID,
    };
    this.socket.emit("start timer", message);
  }

  stopTimer(username: string) {
    if (!this.socket || !this.roomID) return;

    const message: TimerMessage = {
      username,
      roomID: this.roomID,
    };
    this.socket.emit("stop timer", message);
  }

  // Turn management
  changeTurn(username: string, cardsChosen: number[]) {
    if (!this.socket || !this.roomID) return;

    const message: TurnChangeMessage = {
      username,
      roomID: this.roomID,
      cardsChosen,
    };
    this.socket.emit("change turn", message);
  }

  // Card matching
  matchedCards(
    username: string,
    playerScore: PlayerScore,
    validCardsRemaining: number[],
    cardsChosen: number[]
  ) {
    if (!this.socket || !this.roomID) return;

    const message: MatchedCardsMessage = {
      username,
      roomID: this.roomID,
      player_score: playerScore,
      validCardsRemaining,
      cardsChosen,
    };
    this.socket.emit("matched cards", message);
  }

  // Chat functionality
  sendMessage(username: string, message: string) {
    if (!this.socket || !this.roomID) return;

    const chatMessage: ChatMessage = {
      username,
      message,
      timeSent: new Date().toISOString(),
      roomID: this.roomID,
    };
    this.socket.emit("send message", chatMessage);
  }

  // Event listeners
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

  onTurnChanged(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("turn changed", callback);
  }

  onCardsMatched(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("cards matched", callback);
  }

  onMessageSent(callback: (gameDetails: GameDetails) => void) {
    if (!this.socket) return;
    this.socket.on("message sent", callback);
  }

  // Connection management
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.roomID = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getRoomId(): string | null {
    return this.roomID;
  }
}

export const socketService = new SocketService();
