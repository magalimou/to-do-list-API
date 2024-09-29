const categoriaModel = require('../models/categoriaModel');
const tareaModel = require('../models/tareaModel');

//crear categoria
const createCategoria = async (req, res) => {
  const {nombre, id_proyecto, descripcion } = req.body;

  if (!id_proyecto || !nombre) {
    return res.status(400).json({ error: 'El campo id_proyecto y nombre son obligatorios' });
  }

  try {
    const nuevaCategoriaId = await categoriaModel.createCategoria(nombre, id_proyecto, descripcion);
    res.status(201).json({ id: nuevaCategoriaId, message: 'Categoria creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoria' });
  }
};

//actualizar el nombre de una categoria
const updateNombreCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }

  try {
    await categoriaModel.updateNombreCategoria(id, nombre);
    res.json({ message: 'Categoria actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el nombre de la categoria' });
  }
}

//listar todas las categorias por id de proyecto
const getCategoriasByProyecto = async (req, res) => {
  const { id_proyecto } = req.params;
 
  try {
    const categorias = await categoriaModel.getCategoriasByProyecto(id_proyecto);
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorias del proyecto' });
  }
}

const getCategoriaById = async (req, res) => {
  const { id } = req.params;
 
  try {
    const categoria = await categoriaModel.getCategoriaById(id);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoria' });
  }
}

//borrar una categoria por su id
const deleteCategoriaById = async (req, res) => {
  const { id } = req.params;

  try {
    // Primero elimina todas las tareas asociadas a la categoría
    await tareaModel.deleteTareasByCategoria(id);

    // Luego elimina la categoría
    const resultado = await categoriaModel.deleteCategoria(id);

    if (resultado) {
      res.status(200).json({ message: 'Categoría y sus tareas eliminadas exitosamente' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría y sus tareas' });
  }
};

module.exports = {
    createCategoria,
    updateNombreCategoria,
    getCategoriasByProyecto,
    getCategoriaById,
    deleteCategoriaById
};