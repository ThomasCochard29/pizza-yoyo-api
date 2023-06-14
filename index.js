//! Import Dependence
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import path from "path"

//! Import Routes
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import categorieRoutes from "./routes/categories.js"
import pizzaRoutes from "./routes/pizzas.js"
import dotenv from "dotenv"

dotenv.config();
const app = express();

//! Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
});
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join("./public/uploads")));

//! Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/categories", categorieRoutes)
app.use("/api/pizzas", pizzaRoutes)

//! Message Start Server
app.listen(8800, () => {
    console.log("API working!");
})