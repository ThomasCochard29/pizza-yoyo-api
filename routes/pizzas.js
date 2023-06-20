import express from "express";
import {getPizza, getIdPizza, addPizza, updatePizza, deletePizza} from "../controllers/pizza.js";

const router = express.Router();

router.get("/find", getPizza)
router.get("/findid/:id", getIdPizza)
router.post("/add", addPizza)
router.put("/update/:id_pizza", updatePizza)
router.delete("/delete/:id_pizza", deletePizza)

export default router;