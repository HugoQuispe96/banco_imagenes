const Imagen = require('./model');

const createOne = async (data) => {
  let response = await Imagen.create(data);
  return response;
}

const findForID = async (id) => {
  let response = await Imagen.findByPk(id);
  return response;
}

module.exports = {
  createOne,
  findForID
}