import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import { Admin } from "../models/Admin";

export const validateAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized request!", success: false });
  }

  try {
    verify(token, config.JWT_SECRET, async (err, decoded: any) => {
      if (err || !decoded) {
        return res.status(401).json({ msg: "Unauthorized request!", success: false });
      }
      
      const admin = await Admin.findById(decoded.id);
      if (!admin || !admin.isAdmin) {
        return res.status(403).json({ msg: "Access forbidden. Admin privileges required.", success: false });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(`Internal auth error - error in admin token validation middleware`);
    res.status(500).json({ msg: "Internal auth error" });
  }
};