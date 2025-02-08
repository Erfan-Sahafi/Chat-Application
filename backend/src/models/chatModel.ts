import mongoose, { Document, Schema } from "mongoose";

interface IChat extends Document {
  participants: mongoose.Schema.Types.ObjectId[]; // اعضای چت (2 نفر)
  messages: mongoose.Schema.Types.ObjectId[]; // لیست پیام‌ها
  lastMessage?: mongoose.Schema.Types.ObjectId; // آخرین پیام ارسال‌شده
}

const ChatSchema = new Schema<IChat>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const Chat = mongoose.model<IChat>("Chat", ChatSchema);
export default Chat;
