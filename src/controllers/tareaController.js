const tareaModel = require('../models/tareaModel');

const createTarea = async (req, res) => {
  const { id_proyecto, titulo, descripcion, estado, prioridad } = req.body;

  if (!id_proyecto || !titulo) {
    return res.status(400).json({ error: 'El campo id_proyecto y titulo son obligatorios' });
  }

  try {
    const nuevaTareaId = await tareaModel.createTarea(id_proyecto, titulo, descripcion, estado, prioridad);
    res.status(201).json({ id_tarea: nuevaTareaId, message: 'Tarea creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

const deleteTareaById = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await tareaModel.deleteTareaById(id);
    if (resultado) {
      res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

const updateTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado, prioridad } = req.body;

  try {
    const tareaActualizada = await tareaModel.updateTarea(id, { titulo, descripcion, estado, prioridad });
    if (tareaActualizada) {
      res.status(200).json({ message: 'Tarea actualizada exitosamente' });
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

const getTareasByProyecto = async (req, res) => {
  const { id_proyecto } = req.params;

  try {
    const tareas = await tareaModel.getTareasByProyecto(id_proyecto);
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas del proyecto' });
  }
};

const getTareaById = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await tareaModel.getTareaById(id);
    if (tarea) {
      res.status(200).json(tarea);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

const getTareasFinalizadasByUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const tareas = await tareaModel.getTareasFinalizadasByUsuario(id_usuario);
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas finalizadas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas finalizadas' });
  } 
};

module.exports = {
  createTarea,
  deleteTareaById,
  updateTarea,
  getTareasByProyecto,
  getTareaById,
  getTareasFinalizadasByUsuario
};
