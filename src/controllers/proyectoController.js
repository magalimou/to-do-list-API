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

const updateNombreProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }

  try {
    const proyectoActualizado = await proyectoModel.updateNombreProyecto(id, nombre);
    if (proyectoActualizado) {
      res.status(200).json({ message: 'Nombre del proyecto actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el nombre del proyecto' });
  }
};

const getProyectosByUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const proyectos = await proyectoModel.getProyectosByUsuario(id_usuario);
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos del usuario' });
  }
};

module.exports = {
  createProyecto,
  updateNombreProyecto,
  getProyectosByUsuario
};
