const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NotificacionesSchema = new Schema({
  estado : String,
  contenido: String
});

var Notificacion = mongoose.model('Notificacione', NotificacionesSchema);

module.exports = Notificacion;