import { Request, Response } from "express";
import { Admin } from "../models/Admin";
import { Password } from "../helpers/password";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../models/User";
import { getRoomDetails } from "../utils/getRoomDetails";
import { RedisClient } from "../config/db";

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || !(await Password.compare(admin.password, password))) {
      return res.status(400).json({ msg: "Invalid credentials", success: false });
    }

    const payload = {
      id: admin.id,
      isAdmin: admin.isAdmin
    };

    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          success: true,
          admin: {
            username: admin.username,
            email: admin.email
          }
        });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};

export const getSystemStats = async (req: Request, res: Response) => {
  try {
    // Get total registered users
    const totalUsers = await User.countDocuments();

    // Get online players from Redis
    const currentRoomId = await RedisClient.get("currentRoomId");
    const activeRooms = [];
    let onlinePlayers = 0;

    if (currentRoomId) {
      for (let i = 1; i <= parseInt(currentRoomId); i++) {
        const roomDetails = await getRoomDetails(i.toString());
        if (roomDetails && roomDetails.players && roomDetails.players.length > 0) {
          activeRooms.push({
            roomId: i,
            players: roomDetails.players,
            gameInProgress: roomDetails.timerStarted
          });
          onlinePlayers += roomDetails.players.length;
        }
      }
    }

    // Get game statistics
    const totalGamesPlayed = await User.aggregate([
      {
        $group: {
          _id: null,
          totalMultiplayerGames: { $sum: "$numOfGamesMultiplayer" },
          totalSingleplayerGames: { $sum: "$numOfGamesSingleplayer" }
        }
      }
    ]);

    const stats = {
      totalUsers,
      onlinePlayers,
      activeRooms,
      totalGames: {
        multiplayer: totalGamesPlayed[0]?.totalMultiplayerGames || 0,
        singleplayer: totalGamesPlayed[0]?.totalSingleplayerGames || 0
      }
    };

    return res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};