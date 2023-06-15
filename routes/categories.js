import express from "express";
import { getCategorie, getIdCategorie, addCategorie, updateCategorie, deleteCategorie } from "../controllers/categorie.js";

const router = express.Router();

router.get("/find", getCategorie)
router.get("/findid/:id", getIdCategorie)
router.post("/add", addCategorie)
router.put("/update/:id", updateCategorie)
router.delete("/delete/:id", deleteCategorie)

export default router;