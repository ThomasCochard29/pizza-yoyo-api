import express from "express";
import { getCategorie } from "../controllers/categorie.js";

const router = express.Router();

router.get("/find", getCategorie)

export default router;