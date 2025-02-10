import { Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, username, profilePictures } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: req.user?._id },
      {
        name,
        username,
        email,
        profilePictures,
      },
      { new: true, runValidators: true }
    )
      .select("-password")
      .lean();
    if (!user) {
      res.status(400).json({
        message: "user update error!!",
      });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};
