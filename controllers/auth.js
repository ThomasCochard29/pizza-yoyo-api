import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//? Register 
export const register = (req, res) => {
    //! Check User If Exists
    const sql = "SELECT * FROM users WHERE username = ?"
    
    db.query(sql, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("L'Utilisateur est déjà créé !")

        //! Create A New User
            //? Hash the Password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const sqlCreate = "INSERT INTO users (`username`, `email`, `password`) VALUE (?)"
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
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

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong password or username!")

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
