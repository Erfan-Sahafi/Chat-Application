import mongoose, { Document } from "mongoose";

export default interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePictures: string[];
  contacts: mongoose.Schema.Types.ObjectId[];
  chats: mongoose.Schema.Types.ObjectId[];
  groups: mongoose.Schema.Types.ObjectId[];
  channels: mongoose.Schema.Types.ObjectId[];
  isOnline: boolean;
  lastSeen: Date;
}

export type IRegisterUserBody = Pick<IUser, "username"|"password"|"email">
