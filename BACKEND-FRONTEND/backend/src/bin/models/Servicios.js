const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ServiciosSchema = new Schema({
  nombre_servicio: String,
 
  ids_categorias: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categorias'
    }
  ],

  ids_notficaciones: [
    {
      type: Schema.Types.ObjectId,
      ref: 'notificaciones'
    }
  ],

  ids_usuarios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

var Servicio = mongoose.model('Servicio', ServiciosSchema);

module.exports = Servicio;