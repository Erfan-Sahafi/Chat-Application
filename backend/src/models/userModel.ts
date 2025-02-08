import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;  
  username: string;
  password: string;
  profilePictures: string[];
  contacts: mongoose.Schema.Types.ObjectId[];
  chats: mongoose.Schema.Types.ObjectId[];
  groups: mongoose.Schema.Types.ObjectId[];
  channels: mongoose.Schema.Types.ObjectId[];
  isOnline: boolean;
  lastSeen: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true,minlength:2 },
    username: { type: String, required: true,unique: true },
    password: { type: String, required: true, minlength: 8,select:false },
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
