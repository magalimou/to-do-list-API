const db = require('../db');

const createCategoria = async (nombre, id_proyecto, descripcion) => {
  const [result] = await db.query(
    'INSERT INTO Categoria  (nombre, id_proyecto, descripcion) VALUES (?, ?, ?)',
    [nombre, id_proyecto, descripcion]
  );
  return result.insertId;
};

const updateNombreCategoria = async (id, nombre, descripcion) => {
    await db.query('UPDATE Categoria SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
};

const getCategoriasByProyecto = async (id_proyecto) => {
    const [categorias] = await db.query('SELECT * FROM Categoria WHERE id_proyecto = ?', [id_proyecto]);
    return categorias;
};

//Borrar Tareas 
const deleteCategoria = async (id) => {
    await db.query('DELETE FROM Categoria WHERE id = ?', [id]);
};

module.exports = {
    createCategoria,
    updateNombreCategoria,
    getCategoriasByProyecto,
    deleteCategoria,
};