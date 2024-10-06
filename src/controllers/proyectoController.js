const proyectoModel = require('../models/proyectoModel');
const categoriaModel = require('../models/categoriaModel');
const tareaModel = require('../models/tareaModel');
const usuarioModel = require('../models/usuarioModel');

const createProyecto = async (req, res) => {
  const { id_usuario, nombre, descripcion } = req.body;

  if (!id_usuario || !nombre) {
    return res.status(400).json({ error: 'El campo id_usuario y nombre son obligatorios' });
  }

  try {

    const usuario = await usuarioModel.getUserById(id_usuario);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const nuevoProyectoId = await proyectoModel.createProyecto(id_usuario, nombre, descripcion);
    res.status(201).json({ id_proyecto: nuevoProyectoId, message: 'Proyecto creado exitosamente' });
    
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

const getProyectoById = async (req, res) => {
  const { id } = req.params;

  try {
    const proyecto = await proyectoModel.getProyectoById(id);
    if (proyecto) {
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

const deleteProyecto = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener las categorías del proyecto
    const categorias = await categoriaModel.getCategoriasByProyecto(id);

    // Borrar tareas de cada categoría
    for (const categoria of categorias) {
      await tareaModel.deleteTareasByCategoria(categoria.id);  // Borrar tareas por id de categoría
    }

    // Borrar las categorías del proyecto
    await categoriaModel.deleteCategoriaByProyecto(id);

    // Finalmente, borrar el proyecto
    await proyectoModel.deleteProyecto(id);

    res.json({ message: 'Proyecto y todos sus datos asociados eliminados correctamente' });
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto y sus datos asociados' });
  }
};

module.exports = {
  createProyecto,
  updateNombreProyecto,
  getProyectosByUsuario,
  getProyectoById,
  deleteProyecto
};
