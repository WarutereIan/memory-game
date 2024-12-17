import { Server } from "socket.io";

import { RedisClient } from "./db";
import { randomUUID } from "crypto";
import Redis from "ioredis";
import { getRoomDetails } from "../utils/getRoomDetails";

export const SocketServer = new Server({
  path: "/play",
});

interface IPlayerScore {
  currentStreak: number;
  correctPairsMatched: number;
  misses: number;
  longestStreak: number;
  username: string;
}

interface IGameMessage {
  username: string;
  msg: string;
  timeSent: string;
}

interface IGameDetails {
  players: string[]; //their usernames
  gameStatus: "not_started" | "started" | "finished";
  currentPlayerTurn: string;
  currentPlayerScores: IPlayerScore[];
  gameMessages: IGameMessage[];
  timerStarted: boolean;
  timerStartedBy: string;
  timerStoppedBy: string;
  validCards: [];
}

//initial game details:
let gameDetails: IGameDetails = {
  players: [],
  gameStatus: "not_started", //started, finished, not_started
  currentPlayerTurn: "",
  currentPlayerScores: [],
  gameMessages: [],
  timerStarted: false,
  timerStartedBy: "",
  timerStoppedBy: "",
  validCards: [],
};

//generate initial current room id:
let currentRoomId = randomUUID();

await RedisClient.set("currentRoomId", currentRoomId);

//list of sockets
let socketsList = [];

await RedisClient.set(currentRoomId, JSON.stringify(socketsList));

SocketServer.on("connection", async (socket) => {
  //when user hits play button:

  //get the current lobby/game id from cache
  let currentLobby = await RedisClient.get("currentRoomId");

  if (!currentLobby) {
    return;
  }

  let currentLobbyDetails: any = await RedisClient.get(currentLobby);

  if (!currentLobbyDetails) {
    return;
  }

  currentLobbyDetails = JSON.parse(currentLobbyDetails);

  if (currentLobbyDetails.length <= 2) {
    currentLobbyDetails.push(socket);
  }

  if (currentLobbyDetails.length > 2) {
    currentLobbyDetails.push(socket);
    //create room for all sockets
    currentLobbyDetails.forEach(async (_socket) => {
      await _socket.join(currentLobby);
    });

    //configure new lobby with empty game details
    await RedisClient.set(currentLobby, JSON.stringify(gameDetails));

    SocketServer.to(currentLobby).emit("gameStarting", {
      roomID: currentLobby,
    });

    //create new currentRoomId
    let newRoomId = randomUUID();
    await RedisClient.set("currentRoomId", newRoomId);

    //now to listen to game events from the client
    socket.on("start game", async (msg) => {
      //user supposed to submit username at this stage. shold also have room id submitted
      const { username, roomID } = msg;
      // get user's room
      let roomDetails: any = await getRoomDetails(roomID);

      roomDetails.players.push(username);

      if (roomDetails.players.length == 3) {
        roomDetails.currentPlayerTurn = roomDetails.players[0]; //start at 0 index
        //initialize the player scorecards:
        roomDetails.players.forEach((player) => {
          let playerScoreCard: IPlayerScore = {
            currentStreak: 0,
            correctPairsMatched: 0,
            misses: 0,
            longestStreak: 0,
            username: player,
          };

          roomDetails.currentPlayerScores.push(playerScoreCard);
        });
      }

      await RedisClient.set(roomID, JSON.stringify(roomDetails));

      return SocketServer.to(roomID).emit("game started", roomDetails);
    });

    socket.on("start timer", async (msg) => {
      const { username, roomID } = msg;
      let roomDetails: any = await getRoomDetails(roomID);

      roomDetails.timerStarted = true;
      roomDetails.timerStartedBy = username;

      await RedisClient.set(roomID, JSON.stringify(roomDetails));

      return SocketServer.to(roomID).emit("timer started", roomDetails);
    });

    socket.on("stop timer", async (msg) => {
      const { username, roomID } = msg;
      let roomDetails: any = await getRoomDetails(roomID);

      roomDetails.timerStarted = false;
      roomDetails.timerStoppedBy = username;

      await RedisClient.set(roomID, JSON.stringify(roomDetails));

      return SocketServer.to(roomID).emit("timer stopped", roomDetails);
    });

    socket.on("change turn", async (msg) => {
      const { username, roomID, cardsChosen } = msg;
      let roomDetails: any = await getRoomDetails(roomID);

      //get index of current player:
      const index = roomDetails.players.indexOf(username);

      if (index < 2) {
        let nextPlayerIndex = index + 1;
        roomDetails.currentPlayerTurn = roomDetails.players[nextPlayerIndex];
      } else {
        roomDetails.currentPlayerTurn = roomDetails.players[0];
      }

      await RedisClient.set(roomID, JSON.stringify(roomDetails));

      return SocketServer.to(roomID).emit("turn changed", roomDetails, {
        cardsChosen: cardsChosen,
      });
    });

    socket.on("matched cards", async (msg) => {
      const {
        username,
        roomID,
        player_score,
        validCardsRemaining,
        cardsChosen,
      } = msg;
      let roomDetails: any = await getRoomDetails(roomID);

      //get user score card and update score
      for (let i = 0; i < 3; i++) {
        if (roomDetails.currentPlayerScores[i].username == username) {
          roomDetails.currentPlayerScores[i] = player_score;
        }
      }

      roomDetails.validCards = validCardsRemaining;

      await RedisClient.set(roomID, JSON.stringify(roomDetails));

      return SocketServer.to(roomID).emit("cards matched", roomDetails, {
        cardsChosen: cardsChosen,
      });
    });

    socket.on("send message", async (msg) => {
      const { username, message, timeSent, roomID } = msg;
      let roomDetails: any = await getRoomDetails(roomID);

      roomDetails.gameMessages.push({ username, msg: message, timeSent });

      await RedisClient.set(roomID, JSON.stringify(roomDetails));

      return SocketServer.to(roomID).emit("message sent", roomDetails);
    });
  }
});

//events to listen to, and emit in socketio:

//emitted by client, listen to on server: //will also be the same events emitted to the client side
/**
 * gameStarted
 * gameFinished
 * timerStarted
 * timerPaused
 * currentPlayerInTurn
 * playerSelectedCards
 * playerMatchedCards
 * newChat
 *
 *
 */
