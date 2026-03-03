import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "URL",
      required: true,
    },
    ip: String,
    browser: String,
    os: String,
    device: String,
    country: String,
  },
  { timestamps: true }
);

export const Click =  mongoose.model("Click", clickSchema);