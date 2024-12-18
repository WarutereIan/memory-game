import { RedisClient, connectDB } from "./config/db";
import express from "express";
import { configureMiddleware } from "./middlewares/config";
import { configureRoutes } from "./routes";
import { createServer } from "http";
import { cpus } from "os";
import cluster from "cluster";
import { config } from "./config/config";
import { SocketServer } from "./config/socketio";

let db: any;
(async () => {
  db = await connectDB();
})();

//initialize express app
const app = express();

//configure Express middleware
configureMiddleware(app);

//setup routes
configureRoutes(app);

//Start server and listen for connections
const httpServer = createServer(app);

httpServer.listen(config.PORT || 5000, () => {
  console.info(
    `/api/v1 Server started on`,
    httpServer.address(),
    `PID ${process.pid} \n`
  );
});

SocketServer.attach(httpServer);

SocketServer.listen(5500);
