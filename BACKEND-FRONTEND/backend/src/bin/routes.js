const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const { controller } = require('./Controller')

app.get("/", (req, res) => {
  res.send('Inicio del proyecto');
})

app.get("/usuarios", (req, res) => {
  controller.getUsuarios(res);
})

app.get("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  controller.getUsuario(res, id);
})

app.get("/usuarios/ciudades/:ciudad", (req, res) => {
  let ciudad = req.params.ciudad;
  controller.getUsuarioPorCiudad(res, ciudad);
})

app.post("/usuarios", (req, res) => {
  let datos = req.body.datos;
  controller.crearUsuario(res, datos);
})

app.delete("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  controller.deleteUsuario(res, id);
})


//servicios
app.get("/servicios", (req, res) => {
  controller.getServicios(res);
})
app.get("/servicios/pintar", (req, res) => {
  controller.getServiciosPintar(res);
})
app.get("/servicios/:id", (req, res) => {
  let id = req.params.id
  controller.getServiciosId(res, id);
})

// Categorias
app.get("/categorias", (req, res) => {
  controller.getCategorias(res);
})
app.get("/categorias/:id", (req, res) => {
  let id = req.params.id;
  controller.getCategoriaId(res, id);
})
app.get("/categorias/temas/:nombre", (req, res) => {
  let nombre = req.params.nombre;
  controller.getCategoriaNombre(res, nombre);
})

// Notificaciones
app.get("/notificaciones" ,(req, res ) => {
  controller.getNotificaciones(res);
})
app.get("/notificaciones/:id" ,(req, res ) => {
  let id = req.params.id;
  controller.getNotificacionId(res, id);
})
app.get("/notificaciones/estado/:estado" ,(req, res ) => {
  let estado = req.params.estado;
  controller.getNotificacionEstado(res, estado);
})

exports.app = app;