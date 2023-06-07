//! Import Dependence
import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

//! Import Routes
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import categorieRoutes from "./routes/categories.js"

const app = express();

//! Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//! Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/categories", categorieRoutes)

//! Message Start Server
app.listen(8800, () => {
    console.log("API working!");
})