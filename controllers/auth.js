import { db } from "../connect.js";
import jwt from "jsonwebtoken";

//? Register 
export const register = (req, res) => {
    //! Check User If Exists
    const sql = "SELECT * FROM users WHERE username = ?"
    
    db.query(sql, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("L'Utilisateur est déjà créé !")

        //! Create A New User
        const sqlCreate = "INSERT INTO users (`username`, `email`, `password`) VALUE (?)"
        const values = [
            req.body.username,
            req.body.email,
            req.body.password
        ]

        db.query(sqlCreate, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("L'Utilisateur a bien été créé !")
        })
    })
}

//? Login
export const login = (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?"

    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("L'Utilisateur n'existe pas !")

        const token = jwt.sign({id:data[0].id}, "secretkey");
        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200)
        .json(others);
    })
}

//? Logout
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    })
    .status(200)
    .json("L'Utilisateur est bien déconnecté !")
}
