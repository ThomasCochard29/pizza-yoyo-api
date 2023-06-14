import { db } from "../connect.js";
import path from "path";
import util from "util";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPizza = (req, res) => {
  const q = "SELECT *, c.base AS categorie_base FROM pizza p JOIN categorie c ON p.categorie_id = c.id";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const addPizza = async (req, res) => {
  const imagePath = path.join(__dirname, '..', 'public', 'uploads');

  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'Aucune image sélectionnée' });
  }

  try {
    
    const file = req.files.image;
    const fileName = file.name;
    const size = file.data.length;
    const extension = path.extname(fileName);

    const allowedExtensions = /png|jpeg|jpg|gif/;

    if (!allowedExtensions.test(extension)) throw "Unsupported extension!";
    if (size > 10000000) throw "File Must Be Less Than 5MB";

    const md5 = file.md5;
    const URL = "/uploads/" + md5 + extension;

    await util.promisify(file.mv)(path.join(imagePath, md5 + extension));

    const q = "INSERT INTO pizza (`nom`, `description`, `prix`, `image`, `image_descrip`, `categorie_id`) VALUES (?)";
    const values = [
      req.body.nom,
      req.body.description,
      req.body.prix,
      URL,
      req.body.image_descrip,
      req.body.categorie_id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error('Erreur lors de l\'enregistrement de l\'image:', err);
        return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'image' });
      }

      return res.status(200).json({ message: 'Image enregistrée avec succès' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString(),
    });
  }
};