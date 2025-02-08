import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId;
  content: string;
  media?: string;
  messageType: "text" | "image" | "video" | "voice";
  seenBy: mongoose.Types.ObjectId[];
  deletedForBoth: boolean;
  deletedFor: mongoose.Types.ObjectId[];
  editedAt?: Date;  // تاریخ ویرایش پیام
  editedBy?: mongoose.Types.ObjectId;  // کاربری که پیام را ویرایش کرده است
  isEdited: boolean;  // آیا پیام ویرایش شده است یا خیر
}
const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    content: { type: String },
    media: { type: String },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "voice"],
      required: true,
    },
    seenBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    deletedForBoth: { type: Boolean, default: false }, // پیام برای دو طرف حذف شده
    deletedFor: [{ type: Schema.Types.ObjectId, ref: "User" }], // کسانی که پیام را فقط برای خود حذف کرده‌اند
    editedAt: { type: Date },  // تاریخ ویرایش پیام
    editedBy: { type: Schema.Types.ObjectId, ref: "User" },  // کاربری که پیام را ویرایش کرده است
    isEdited: { type: Boolean, default: false },  // آیا پیام ویرایش شده است یا خیر
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
