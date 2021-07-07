const multer = require("../../middleware/multer");
const general = require("../../utils/general");
const Imagen = require("../../database/imagenes/logic");

function index(req, res) {
  multer.uploadImage(req, res, async (err) => {
    if (!req.file) {
      return res.status(400).json({ "Error": "No se ingreso imagen" });
    }
    if (err) {
      return res.status(400).json({ "Error": err });
    }
    if (req.fileError) {
      return res.status(400).json({ "Error": req.fileError });
    }
    const url = process.env.NODE_ENV == "Production"
      ? general.ruta_https + req.file.filename
      : general.ruta_http + req.file.filename;
    const imagen = {
      "nombre": req.file.originalname,
      "url": url
    };
    const respuesta = await Imagen.createOne(imagen);
    return res.status(200).json({ url });
  })
}

module.exports = {
  index
}