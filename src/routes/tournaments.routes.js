import { Router } from "express";
import {
    getTournaments,
    createTournament,
    getTournament,
    deleteTournament,
    updateTournament
} from "../controllers/tournaments.controller.js";
import { deleteOneImage } from "../controllers/news.controller.js";

const router = Router();

router.get("/", getTournaments);
router.post("/", createTournament);

router.get("/:id", getTournament);
router.delete("/:id", deleteTournament);
router.put("/:id", updateTournament)

router.delete("/delete-image/:img(*)", deleteOneImage);


export default router;
