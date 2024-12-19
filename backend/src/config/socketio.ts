import { Server, Socket } from "socket.io";
import { RedisClient } from "./db";

export const SocketServer = new Server({ cors: { origin: "*", methods: "*" } });

interface IPlayerScore {
  currentStreak: number;
  correctPairsMatched: number;
  misses: number;
  longestStreak: number;
  username: string;
}

interface GameMessage {
  username: string;
  msg: string;
  timeSent: string;
}

interface GameDetails {
  players: string[];
  currentPlayerScores: IPlayerScore[];
  currentPlayerTurn?: string;
  timerStarted: boolean;
  timerStartedBy?: string;
  timerStoppedBy?: string;
  validCards: any[]; // Replace with your card type
  gameMessages: GameMessage[];
}

interface GameState {
  roomID: string;
  username?: string;
  cardsChosen?: any[]; // Replace with your card type
  player_score?: IPlayerScore;
  validCardsRemaining?: any[]; // Replace with your card type
  message?: string;
  timeSent?: string;
}

export class SocketRoomManager {
  private readonly MAX_PLAYERS_PER_ROOM = 3;
  private socketServer: Server;
  private redisClient: typeof RedisClient;

  constructor(socketServer: Server, redisClient: typeof RedisClient) {
    this.socketServer = socketServer;
    this.redisClient = redisClient;
    this.initializeRoom();
  }

  private async initializeRoom() {
    await this.redisClient.set("currentRoomId", "1");
    await this.redisClient.set("1", JSON.stringify([]));
  }

  public async handleConnection(socket: Socket) {
    try {
      const currentRoomId = await this.redisClient.get("currentRoomId");
      if (!currentRoomId) {
        console.error("No current room ID found");
        return;
      }

      const roomDetailsStr = await this.redisClient.get(currentRoomId);
      if (!roomDetailsStr) {
        console.error(`No room details found for room ${currentRoomId}`);
        return;
      }

      const roomDetails: string[] = JSON.parse(roomDetailsStr);

      if (roomDetails.length < this.MAX_PLAYERS_PER_ROOM) {
        // Add player to current room
        roomDetails.push(socket.id);
        await this.redisClient.set(currentRoomId, JSON.stringify(roomDetails));

        console.log(
          `Player ${socket.id} joined room ${currentRoomId}. Players: ${roomDetails.length}/${this.MAX_PLAYERS_PER_ROOM}`
        );

        // If room is now full, start the game
        if (roomDetails.length === this.MAX_PLAYERS_PER_ROOM) {
          await this.startGame(currentRoomId, roomDetails);
        }
      }

      this.setupGameEventListeners(socket);
    } catch (error) {
      console.error("Error handling socket connection:", error);
    }
  }

  private async startGame(roomId: string, players: string[]) {
    try {
      // Join all sockets to the room
      for (const playerId of players) {
        const playerSocket = this.socketServer.sockets.sockets.get(playerId);
        if (playerSocket) {
          await playerSocket.join(roomId);
        }
      }

      console.log(`Game started in room ${roomId}`);

      // Initialize game details
      const gameDetails: GameDetails = {
        players: [],
        currentPlayerScores: [],
        timerStarted: false,
        validCards: [],
        gameMessages: [],
      };

      // Save game details to Redis
      await this.redisClient.set(roomId, JSON.stringify(gameDetails));

      // Notify all players in the room
      this.socketServer.to(roomId).emit("gameStarting", {
        roomId: roomId,
        players: players,
      });

      // Create new room for next group
      const newRoomId = (parseInt(roomId) + 1).toString();
      await this.redisClient.set("currentRoomId", newRoomId);
      await this.redisClient.set(newRoomId, JSON.stringify([]));

      console.log(`New room ${newRoomId} created and ready`);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  }

  private async getRoomDetails(roomId: string): Promise<GameDetails> {
    const roomDetailsStr = await this.redisClient.get(roomId);
    if (!roomDetailsStr) {
      throw new Error(`No room details found for room ${roomId}`);
    }
    return JSON.parse(roomDetailsStr);
  }

  private setupGameEventListeners(socket: Socket) {
    socket.on("start game", async (msg: GameState) => {
      try {
        const { username, roomID } = msg;

        if (!username || !roomID) {
          console.log("detais not provided");

          return;
        }

        let roomDetails = await this.getRoomDetails(roomID);

        roomDetails.players.push(username);

        console.log(roomDetails);

        if (roomDetails.players.length === this.MAX_PLAYERS_PER_ROOM) {
          roomDetails.currentPlayerTurn = roomDetails.players[0];
          //valid cards should be set as per the player at index 0 at this stage

          // Initialize player scorecards
          roomDetails.currentPlayerScores = roomDetails.players.map(
            (player) => ({
              currentStreak: 0,
              correctPairsMatched: 0,
              misses: 0,
              longestStreak: 0,
              username: player,
            })
          );

          this.socketServer.to(roomID).emit("game started", roomDetails);
        }

        await this.redisClient.set(roomID, JSON.stringify(roomDetails));
      } catch (error) {
        console.error("Error in start game:", error);
      }
    });

    socket.on("start timer", async (msg: GameState) => {
      try {
        const { username, roomID } = msg;
        if (!username || !roomID) return;

        let roomDetails = await this.getRoomDetails(roomID);
        roomDetails.timerStarted = true;
        roomDetails.timerStartedBy = username;

        await this.redisClient.set(roomID, JSON.stringify(roomDetails));
        this.socketServer.to(roomID).emit("timer started", roomDetails);
      } catch (error) {
        console.error("Error in start timer:", error);
      }
    });

    socket.on("stop timer", async (msg: GameState) => {
      try {
        const { username, roomID } = msg;
        if (!username || !roomID) return;

        let roomDetails = await this.getRoomDetails(roomID);
        roomDetails.timerStarted = false;
        roomDetails.timerStoppedBy = username;

        await this.redisClient.set(roomID, JSON.stringify(roomDetails));
        this.socketServer.to(roomID).emit("timer stopped", roomDetails);
      } catch (error) {
        console.error("Error in stop timer:", error);
      }
    });

    socket.on("change turn", async (msg: GameState) => {
      try {
        const { username, roomID, cardsChosen } = msg;
        if (!username || !roomID) return;

        console.log("change turn", msg);

        let roomDetails = await this.getRoomDetails(roomID);
        const currentIndex = roomDetails.players.indexOf(username);

        roomDetails.currentPlayerTurn =
          roomDetails.players[currentIndex < 2 ? currentIndex + 1 : 0];

        await this.redisClient.set(roomID, JSON.stringify(roomDetails));
        this.socketServer
          .to(roomID)
          .emit("turn changed", roomDetails, { cardsChosen });
      } catch (error) {
        console.error("Error in change turn:", error);
      }
    });

    socket.on("matched cards", async (msg: GameState) => {
      try {
        const {
          username,
          roomID,
          player_score,
          validCardsRemaining,
          cardsChosen,
        } = msg;
        if (!username || !roomID) return;

        let roomDetails = await this.getRoomDetails(roomID);

        const playerIndex = roomDetails.currentPlayerScores.findIndex(
          (score) => score.username === username
        );

        if (playerIndex !== -1 && player_score) {
          roomDetails.currentPlayerScores[playerIndex] = player_score;
        }

        if (validCardsRemaining) {
          roomDetails.validCards = validCardsRemaining;
        }

        await this.redisClient.set(roomID, JSON.stringify(roomDetails));
        this.socketServer
          .to(roomID)
          .emit("cards matched", roomDetails, { cardsChosen });
      } catch (error) {
        console.error("Error in matched cards:", error);
      }
    });

    socket.on("send message", async (msg: GameState) => {
      try {
        const { username, message, timeSent, roomID } = msg;
        if (!username || !message || !timeSent || !roomID) return;

        let roomDetails = await this.getRoomDetails(roomID);
        roomDetails.gameMessages.push({
          username,
          msg: message,
          timeSent,
        });

        await this.redisClient.set(roomID, JSON.stringify(roomDetails));
        this.socketServer.to(roomID).emit("message sent", roomDetails);
      } catch (error) {
        console.error("Error in send message:", error);
      }
    });
  }
}

// Usage example:
const roomManager = new SocketRoomManager(SocketServer, RedisClient);

SocketServer.on("connection", (socket: Socket) => {
  roomManager.handleConnection(socket);
});
