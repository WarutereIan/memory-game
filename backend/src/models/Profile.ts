import { model, Schema } from "mongoose";
import { IProfile } from "../types/IProfile";

const ProfileSchema = new Schema<IProfile>({
  userId: {
    type: Schema.ObjectId,
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
  totalWinsMultiplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  totalCardMissesMultiplayer: {
    type: Number,
    required: true,
    default: 0,
  },
  totalCardMissesSingleplayer: {
    type: Number,
    required: true,
    default: 0,
  },
});

ProfileSchema.index({ totalWinsMultiplayer: -1 });

export const Profile = model<IProfile>("Profile", ProfileSchema);
