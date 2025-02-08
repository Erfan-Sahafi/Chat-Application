import mongoose, { Document, Schema } from "mongoose";

interface IGroup extends Document {
  name: string;
  description?: string;
  admins: mongoose.Schema.Types.ObjectId[];
  participants: mongoose.Schema.Types.ObjectId[];
  members: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId[];
  inviteLink: string;
  createdAt:Date;
  lastMessage?: mongoose.Schema.Types.ObjectId;
}

const GroupSchema = new mongoose.Schema<IGroup>({
  name: { type: String, required: true },
  description: { type: String },
  admins: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ], // اعضای گروه
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  inviteLink: { type: String, unique: true }, // لینک دعوت برای گروه
  createdAt: { type: Date, default: Date.now }, // تاریخ ایجاد گروه
},
{timestamps: true}
);

const Group = mongoose.model<IGroup>("Group", GroupSchema);
export default Group;
