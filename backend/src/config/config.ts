import "dotenv/config";

export const config = {
  //MONGO_URI: process.env.MONGO_STRING!,
  MONGO_URI: "mongodb://localhost:27017",

  PORT: process.env.PORT,

  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_TOKEN_EXPIRES_IN: 3600000 * 1, //expires in 1hours

  
};
