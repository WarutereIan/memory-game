import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import { log } from "console";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized request!", success: false });
  }

  try {
    verify(token, config.JWT_SECRET, (err, decoded: any) => {
      if (err || !decoded) {
        return res
          .status(401)
          .json({ msg: "Unauthorized request!", success: false });
      } else {
        req.user = decoded?.user || decoded;
        // req.activeBalance = decoded?.activeBalance;
        next();
      }
    });
  } catch (err) {
    console.error(`Internal auth error - error in token validation middleware`);
    res.status(500).json({ msg: "Internal auth error" });
  }
};
