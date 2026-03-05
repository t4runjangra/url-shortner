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
      
      },
      shortID: {
        type: String,
        required: true,
        unique: true,
      },
      isActiveQr : {
        type : Boolean,
        default : false,
      },
      Qrcode : {
        type : String,
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

  urlSchema.index({
    originalUrl : "text",
    shortID : "text"
  })

  export const URL = mongoose.model("URL", urlSchema);
