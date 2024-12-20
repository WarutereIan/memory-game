import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/User";
import { Password } from "../helpers/password";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { Profile } from "../models/Profile";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({
        msg: "Passwords do not match",
        success: false,
      });
    }

    if (await User.exists({ username })) {
      return res.status(400).json({
        msg: "Username already exists",
        success: false,
      });
    }

    if (await User.exists({ email })) {
      return res.status(400).json({
        msg: "Email already exists",
        success: false,
      });
    }

    //validate password
    const { error } = Password.validate(password);
    if (error) {
      return res.status(400).json({
        msg: error,
        success: false,
      });
    }

    let date = new Date();

    //create user:
    const user = await User.create({
      username,
      email,
      password,
      confirm_password,
    });

    const userProfile = await Profile.create({ userId: user.id });

    let _user = {
      username: user.username,
    };

    const payload = {
      user: {
        id: user._id,
      },
    };
    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, success: true, _user });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  let { password, email } = req.body;

  try {
    let user = await User.findOne({ email }).select("password username");

    if (!user || !(await Password.compare(user.password, password))) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    let _user = {
      username: user.username,
    };

    console.log(_user);

    // login user
    const payload = {
      id: user.id,
    };
    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      },
      (err, token) => {
        if (err) throw err;

        res.json({
          token,
          success: true,
          _user,
        });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};

//add OTP verification, (2FA)
//add password reset
