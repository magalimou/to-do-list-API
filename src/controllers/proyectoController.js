const proyectoModel = require('../models/proyectoModel');

const createProyecto = async (req, res) => {
  const { id_usuario, nombre, descripcion } = req.body;

  if (!id_usuario || !nombre) {
    return res.status(400).json({ error: 'El campo id_usuario y nombre son obligatorios' });
  }

  try {
    const nuevoProyectoId = await proyectoModel.createProyecto(id_usuario, nombre, descripcion);
    res.status(201).json({ id: nuevoProyectoId, message: 'Proyecto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

module.exports = {
  createProyecto
};
