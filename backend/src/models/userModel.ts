import mongoose, { Document, Schema } from "mongoose";
import IUser from "../@types/IUser";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, minlength: 2 },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    profilePictures: [{ type: String }], // آرایه‌ای از آدرس عکس‌های پروفایل
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // لیست مخاطبین
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], // چت‌های مرتبط
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }], // گروه‌های مرتبط
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }], // کانال‌های مرتبط
    isOnline: { type: Boolean, default: false }, // آنلاین بودن کاربر
    lastSeen: { type: Date, default: Date.now }, // آخرین زمان آنلاین شدن
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
