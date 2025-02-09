import mongoose, { Schema } from "mongoose";

const palmaresSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Palmares", palmaresSchema);
