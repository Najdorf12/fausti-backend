import { Router } from "express";
import {
    getTournaments,
    createTournament,
    getTournament,
    deleteTournament,
    updateTournament
} from "../controllers/tournaments.controller.js";

const router = Router();

router.get("/", getTournaments);
router.post("/", createTournament);

router.get("/:id", getTournament);
router.delete("/:id", deleteTournament);
router.put("/:id", updateTournament)

/* router.get("/category/:categoryName", getEvaByCategory) */

export default router;
