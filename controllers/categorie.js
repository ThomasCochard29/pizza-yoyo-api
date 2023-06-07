import {db} from "../connect.js"

export const getCategorie = (req, res) => {
    const q = "SELECT * FROM categorie"

    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err)
        return res.json(data);
    })
}