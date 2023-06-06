//! Import Dependence
import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

//! Import Routes
import authRoutes from "./routes/auth.js"

const app = express();

//! Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//! Routes
app.use("/api/auth", authRoutes) 

//! Message Start Server
app.listen(8800, () => {
    console.log("API working!");
})