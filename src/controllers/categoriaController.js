const categoriaModel = require('../models/categoriaModel');

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

//borrar una categoria por su id
const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    await categoriaModel.deleteCategoria(id);
    res.json({ message: 'Categoria eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoria' });
  }
}

module.exports = {
    createCategoria,
    updateNombreCategoria,
    getCategoriasByProyecto,
    deleteCategoria
};