import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import newsRoutes from "./routes/news.routes.js";
import tournamentsRoutes from "./routes/tournaments.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import emailRoutes from "./routes/email.routes.js";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fausti-oro.vercel.app"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());

app.use("/api/news", newsRoutes);
app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/send-email", emailRoutes);

export default app;
