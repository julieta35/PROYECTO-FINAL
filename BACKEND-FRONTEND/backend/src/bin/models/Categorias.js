const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategoriasSchema = new Schema({
  nombre_categorias: String,
});

var Categoria = mongoose.model('Categoria', CategoriasSchema);

module.exports = Categoria;