import { Schema, model } from "mongoose";
import { IUser } from "../types/IUser";
import { Password } from "../helpers/password";

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highScoreMultiplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  highScoreSingleplayer: {
    type: Number,
    required: true,
    default: 1000000, //initialize at a high number so that consequent high scores are what are lower than this number
  },
  longestStreakMultiplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  longestStreakSingleplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  numOfGamesMultiplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  numOfGamesSingleplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  totalCardMatchesMultiplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  totalCardMatchesSingleplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  totalWinsMultiplayer: {},
  totalCardMissesMultiplayer: {},
  totalCardMissesSingleplayer:{}
});

//hooks
UserSchema.pre("save", async function (done) {
  //encrypt password
  if (this.isModified("password")) {
    const hashed = await Password.Hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const User = model<IUser>("User", UserSchema);
