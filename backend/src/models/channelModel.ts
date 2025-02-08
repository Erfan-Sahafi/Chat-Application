import mongoose, { Document, Schema } from "mongoose";

interface IChannel extends Document {
  name: string; // نام کانال
  description?: string; // توضیحات کانال (اختیاری)
  owner: Schema.Types.ObjectId; // مالک کانال
  admins: Schema.Types.ObjectId[]; // لیست مدیران کانال
  subscribers: Schema.Types.ObjectId[]; // لیست مشترکین کانال
  messages: Schema.Types.ObjectId[]; // لیست پیام‌ها
  lastMessage?: Schema.Types.ObjectId; // ارجاع به آخرین پیام
  inviteLink: string;
  createdAt?: Date; // تاریخ ایجاد کانال
  updatedAt?: Date; // تاریخ آخرین تغییر
}

const ChannelSchema = new Schema<IChannel>(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // مالک کانال
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }], // مدیران کانال
    subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }], // مشترکین کانال
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }], // پیام‌ها در کانال
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }, // آخرین پیام در کانال
    inviteLink: { type: String, required: true, unique: true }, // لینک دعوت به کانال
  },
  { timestamps: true }
);

const Channel = mongoose.model<IChannel>("Channel", ChannelSchema);
export default Channel;
