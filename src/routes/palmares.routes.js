import { Router } from "express";
import {
    getPalmares,
    createPalmares,
    deletePalmares,
    updatePalmares
} from "../controllers/palmares.controller.js";

const router = Router();

router.get("/", getPalmares);
router.post("/", createPalmares);

router.delete("/:id", deletePalmares);
router.put("/:id", updatePalmares)

export default router;
