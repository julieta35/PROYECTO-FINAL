const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombre1: String,
  nombre1: String,
  apellido1: String,
  apellido2: String,
  identificacion: String,
  sexo: String,
  edad: Number,
  numero_cuenta: String,
  metodo_entrada: String,
  direccion: String,
  celular: Number,
  ciudad: String,
  ids_servicios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Servicio'
    }
  ]
});

var Usuario = mongoose.model('User', UsuarioSchema);

module.exports = Usuario;