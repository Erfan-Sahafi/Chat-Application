import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import IUser from "../@types/IUser";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req?.header("Authorization")?.split(" ");

    if (authHeader?.length !== 2) {
      res.status(403).json({
        message: "this route is protected and you can't have access to it!!",
      });
      return;
    }

    const token = authHeader[1];
    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    const user = await User.findById(jwtPayload.userId).lean();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    Reflect.deleteProperty(user, "password");
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json(err);
    return;
  }
};
