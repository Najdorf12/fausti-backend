import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema(
  {
    players: {
      type: String,
    },
    white: {
      type: String,
    },
    black: {
      type: String,
    },
    location: {
      type: String,
    },
    content: {
      type: String,
    },
    pgn: {
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

export default mongoose.model("Game", gameSchema);
