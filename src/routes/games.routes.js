import { Router } from "express";
import {
    getGames,
    createGame,
    getGame,
    deleteGame,
    updateGame
} from "../controllers/games.controller.js";

const router = Router();

router.get("/", getGames);
router.post("/", createGame);

router.get("/:id", getGame);
router.delete("/:id", deleteGame);
router.put("/:id", updateGame)

export default router;
