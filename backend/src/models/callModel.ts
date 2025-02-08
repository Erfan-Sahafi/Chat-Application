import mongoose, { Schema, Document } from "mongoose";

export interface ICall extends Document {
  type: "audio" | "video"; // نوع تماس: صوتی یا تصویری
  participants: mongoose.Types.ObjectId[]; // شرکت‌کنندگان تماس
  startTime: Date; // زمان شروع تماس
  endTime?: Date; // زمان پایان تماس (اختیاری)
  status: "pending" | "in-progress" | "completed" | "failed"; // وضعیت تماس
  duration?: number; // مدت زمان تماس به ثانیه
  createdAt: Date; // تاریخ و زمان ایجاد تماس
  updatedAt: Date; // تاریخ و زمان آخرین به‌روزرسانی تماس
}

const CallSchema = new Schema<ICall>(
  {
    type: {
      type: String,
      enum: ["audio", "video"],
      required: true,
    },
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "failed"],
      default: "pending",
    },
    duration: { type: Number }, // مدت زمان تماس
  },
  { timestamps: true }
);

export const Call = mongoose.model<ICall>("Call", CallSchema);
