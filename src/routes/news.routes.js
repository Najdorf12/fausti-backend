import { Router } from "express";
import {
    getNews,
    createNew,
    getNew,
    deleteNew,
    updateNew
} from "../controllers/news.controller.js";

const router = Router();

router.get("/", getNews);
router.post("/", createNew);

router.get("/:id", getNew);
router.delete("/:id", deleteNew);
router.put("/:id", updateNew);

/* router.get("/category/:categoryName", getEvaByCategory) */

export default router;
