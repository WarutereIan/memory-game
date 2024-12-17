import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/User";
import { Password } from "../helpers/password";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { Profile } from "../models/Profile";

//user can:
//launch singleplayer(automatically done on client)
//post results of singleplayer game ✅
//launch multiplayer: will submit themselves/their username to lobby pool. Should connect straight to socket server instead
//post results of multiplayer game ✅
//get their own stats/profile ✅
//get leaderboards

export const postSinglePlayerGameResults = async (
  req: Request,
  res: Response
) => {
  try {
    let userId = req.user.id;
    //game results. Here, score is the total number of turns taken to clear: matches + misses
    let { numOfMatches, numOfMisses, longestStreak, score } = req.body;

    let userProfile = await Profile.findOne({ userId: userId });

    if (!userProfile) {
      return res.status(404).json({ msg: "User not found" });
    }
    userProfile.numOfGamesSingleplayer++;
    userProfile.totalCardMatchesSingleplayer += numOfMatches;
    userProfile.totalCardMissesSingleplayer += numOfMisses;
    if (longestStreak > userProfile.longestStreakSingleplayer) {
      userProfile.longestStreakSingleplayer = longestStreak;
    }
    //the shorter the total number of turns taken the higher the score
    if (score < userProfile.highScoreSingleplayer) {
      userProfile.highScoreSingleplayer = score;
    }

    await userProfile.save();

    return res.status(200).json({
      msg: "Successfully saved singleplayer game result",
      userProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const postMultiPlayerGameResults = async (
  req: Request,
  res: Response
) => {
  try {
    let userId = req.user.id;
    //game results. Here, score is the total number of turns taken to clear: matches + misses
    let { numOfMatches, numOfMisses, longestStreak, score } = req.body;

    let userProfile = await Profile.findOne({ userId: userId });

    if (!userProfile) {
      return res.status(404).json({ msg: "User not found" });
    }
    userProfile.numOfGamesMultiplayer++;
    userProfile.totalCardMatchesMultiplayer += numOfMatches;
    userProfile.totalCardMissesMultiplayer += numOfMisses;
    if (longestStreak > userProfile.longestStreakMultiplayer) {
      userProfile.longestStreakMultiplayer = longestStreak;
    }
    //the shorter the total number of turns taken the higher the score
    if (score > userProfile.highScoreMultiplayer) {
      userProfile.highScoreMultiplayer = score;
    }

    await userProfile.save();

    return res
      .status(200)
      .json({ msg: "Successfully saved multiplayer game result", userProfile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getPlayerStats = async (req: Request, res: Response) => {
  try {
    let userId = req.user.id;

    let userProfile = await Profile.findOne({ userId: userId });

    return res.status(200).json(userProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLeaderBoard = async (req: Request, res: Response) => {
  try {
    let leaderboards = Profile.find().limit(10);
    return res.status(200).json({ leaderboards });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
