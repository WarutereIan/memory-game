import { RedisClient } from "../config/db";

export const getRoomDetails = async (roomID: string) => {
  let roomDetails: any = await RedisClient.get(roomID);

  if (!roomDetails) return null;

  roomDetails = JSON.parse(roomDetails);

  if (!roomDetails) return null;

  return roomDetails;
};
