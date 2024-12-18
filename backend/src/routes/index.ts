import { Application } from "express";

export const configureRoutes = (app: Application) => {
  app.use("/api/user/auth", require("./api/user.auth.api"));
  app.use("/api/user/profile", require("./api/user.profle.api"));
};
