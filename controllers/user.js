import {db} from "../connect.js"

export const getUser = (req, res) => {
    const q = "SELECT * FROM users"

    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err)
        return res.json(data);
    })
}