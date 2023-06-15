import express from "express";
import {getPizza, getIdPizza, addPizza, updatePizza} from "../controllers/pizza.js";

const router = express.Router();

router.get("/find", getPizza)
router.get("/find/:id", getIdPizza)
router.post("/add", addPizza)
router.post("/update/:id", updatePizza)

export default router;