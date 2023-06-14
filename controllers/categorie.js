import {db} from "../connect.js"

export const getCategorie = (req, res) => {
    const q = "SELECT * FROM categorie"

    db.query(q, (err, data) => {
        if (err) 
            return res.status(500).json(err)
        return res.json(data);
    })
}

export const addCategorie = (req, res) => {

    //! Create A New Categorie
    const sqlCreate = "INSERT INTO categorie (`base`) VALUE (?)"
    const values = [
        req.body.base
    ]

    db.query(sqlCreate, [values], (err, data) => {
        if (err) 
            return res.status(500).json(err);
        return res
            .status(200)
            .json("La Categorie a bien été créé !")
    })
}