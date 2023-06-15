import {db} from "../connect.js"

export const getCategorie = (req, res) => {
    const q = "SELECT * FROM categorie"

    db.query(q, (err, data) => {
        if (err) 
            return res.status(500).json(err)
        return res.json(data);
    })
}

export const getIdCategorie = (req, res) => {
    const q = "SELECT * FROM categorie WHERE id = ?"
    const id = req.params.id

    db.query(q, id, (err, data) => {
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

export const updateCategorie = (req, res) => {
    if(req.body.base === null) {
        console.log("Nulll");
    } else {
        console.log("Remplie");
        //! Update Categorie
        const sqlCreate = "UPDATE categorie SET base = (?) WHERE id = ?"
        const id = req.params.id;
        const base = req.body.base
    
        db.query(sqlCreate, [base, id], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res
                .status(200)
                .json("La Categorie a bien été update !")
        })
    }
}

export const deleteCategorie = (req, res) => {
    const sql = "DELETE FROM categorie WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json("deleted");
    })
}