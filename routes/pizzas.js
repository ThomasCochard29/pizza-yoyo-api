import express from "express";
import {getPizza, addPizza} from "../controllers/pizza.js";

const router = express.Router();

router.get("/find", getPizza)
router.post("/add", addPizza)

export default router;