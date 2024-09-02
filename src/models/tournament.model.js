import mongoose, { Schema } from "mongoose";

const tournamentSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    location: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    time: {
        type: String,
    },
    images: [
      {
        public_id: { type: String },
        secure_url: { type: String },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tournament", tournamentSchema);
