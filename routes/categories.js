import express from "express";
import { getCategorie, addCategorie } from "../controllers/categorie.js";

const router = express.Router();

router.get("/find", getCategorie)
router.post("/add", addCategorie)

export default router;