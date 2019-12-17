const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const Servicio = require('./models/Servicios');
const Categoria = require('./models/Categorias');
const Notificacion = require('./models/Notificaciones')

class Controller {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect(
        '', {
          useNewUrlParser: true
        }
      );
      console.log('Conectado a la base de datos');
    } catch (err) {
      console.log(err);
    }
  }

  // Manejando Usuarios

  getUsuarios (res) {
    Usuario.find({}, (err, usuarios) => {
      if (err) throw err;
      res.send(usuarios)
    })
  }
  getUsuario(res, id) {
    Usuario.find({_id: id}, (err, user) => {
      if (err) throw err;
      res.send(user)
    })
  }
  deleteUsuario(res, id) {
    Usuario.deleteOne(
      {
        _id: id
      }, (err) => {
        if (err) throw err;
        res.send('Eliminado!')
      }
    )
  }

  getUsuarioPorCiudad(res, nCiudad) {
    Usuario.find({
      ciudad: nCiudad
    }, (err, usuarios) => {
      if (err) throw err;
      res.send(usuarios);
    })
  }

  crearUsuario (res, datos) {
    Usuario.create(
      datos, (err, nuevo) => {
        if (err) throw err;
        res.send({
          mensaje: "Usuario creado",
          u: nuevo
        })
      }
    )
  }

  // Manejando Servicios
  getServicios (res) {
    Servicio.find({}, (err, servicios) => {
      if (err) throw err;
      res.send(servicios)
    })
  }
  getServiciosPintar(res) {
    Servicio.find({nombre_servicio: "pintar"}, (err, servicio) => {
      if (err) throw err;
      res.send(servicio)
    })
  }
  getServiciosId(res, id) {
    Servicio.find({_id: id}, (err, servicio) => {
      if (err) throw err;
      res.send(servicio)
    })
  }


  // Manejando Categorias
  getCategorias(res) {
    Categoria.find({}, (err, categoria) => {
      if (err) throw err;
      res.send(categoria);
    })
  }
  getCategoriaId(res, id){
    Categoria.find({_id: id}, (err, categoria) => {
      if (err) throw err;
      res.send(categoria);
    })
  }
  getCategoriaNombre(res, nombre) {
    Categoria.find({nombre_categorias: nombre}, (err, categoria) => {
      if (err) throw err;
      res.send(categoria);
    })
  }
  getNotificaciones(res) {
    Notificacion.find({}, (err, notify) => {
      if (err) throw err;
      res.send(notify);
    })
  }
  getNotificacionId(res, id) {
    Notificacion.find({_id: id}, (err, notify) => {
      if (err) throw err;
      res.send(notify);
    })
  }
  getNotificacionEstado(res, estado) {
    Notificacion.find({estado: estado}, (err, notify) => {
      if (err) throw err;
      res.send(notify);
    })

  }
}
 
exports.controller = new Controller()