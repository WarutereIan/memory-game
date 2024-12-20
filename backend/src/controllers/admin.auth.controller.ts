import { Request, Response } from "express";
import { Admin } from "../models/Admin";
import { Password } from "../helpers/password";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, adminCode } = req.body;

    // Verify admin key
    if (adminCode !== config.ADMIN_KEY) {
      return res.status(403).json({
        msg: "Invalid admin key",
        success: false,
      });
    }

    // Check if admin already exists
    if (await Admin.exists({ email })) {
      return res.status(400).json({
        msg: "Email already registered",
        success: false,
      });
    }

    if (await Admin.exists({ username })) {
      return res.status(400).json({
        msg: "Username already taken",
        success: false,
      });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    const payload = {
      id: admin.id,
      isAdmin: admin.isAdmin,
    };

    // Generate token
    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          success: true,
          admin: {
            username: admin.username,
            email: admin.email,
          },
        });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
