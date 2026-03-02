import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    expireAt: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const URL = mongoose.model("URL", urlSchema);
