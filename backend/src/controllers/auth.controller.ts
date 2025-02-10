import { Request, Response, RequestHandler } from "express";
import validationCheck from "../validaitors/registerValidaitor";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import IUser, { IRegisterUserBody } from "../@types/IUser";

export const register: RequestHandler = async (
  req: Request<{}, {}, IRegisterUserBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const validation = validationCheck(req.body);
    if (validation !== true) {
      res.status(400).json({ errors: validation });
      return;
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      res.status(400).json({ message: "User with this email already exists!" });
      return;
    }

    const existingUserByUserName = await User.findOne({ username });
    if (existingUserByUserName) {
      res
        .status(400)
        .json({ message: "User with this username already exists!" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    const cookieOption = {
      http: true,
      secure: true,
    };

    res
      .cookie("token", token, cookieOption)
      .status(201)
      .json({
        message: "User registered successfully!",
        user: {
          ...newUser.toObject(),
          password: undefined,
        },
        token,
      });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { identifire, password } = req.body;

    const identifireLowerCase = identifire.toLowerCase();

    const user = await User.findOne({
      $or: [{ username: identifireLowerCase }, { email: identifireLowerCase }],
    });

    if (!user) {
      res.status(400).json({ message: "user not found!" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid password!" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );
    const cookieOption = {
      http: true,
      secure: true,
    };

    res
      .cookie("token", token, cookieOption)
      .status(200)
      .json({
        message: "Login successful!",
        user: {
          ...user.toObject(),
          password: undefined,
        },
        token,
      });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export const getMe: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.user?._id }).select("-password");

    if (!user) {
      res.status(400).json({ message: "user not found!" });
      return;
    }
    res.status(200).json({ message: "get user successful!", user });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};