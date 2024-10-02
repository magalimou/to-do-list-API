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
    const [categorias] = await db.query(`
        SELECT 
            Categoria.id AS id_categoria,  -- Renombrar id a id_categoria
            Categoria.id_proyecto,
            Categoria.nombre,
            Categoria.descripcion
        FROM Categoria 
        WHERE id_proyecto = ?`, [id_proyecto]);
    return categorias;
};

const getCategoriaById = async (id) => {
    const [categoria] = await db.query(`
        SELECT 
            Categoria.id AS id_categoria,  
            Categoria.id_proyecto,
            Categoria.nombre,
            Categoria.descripcion
        FROM Categoria 
        WHERE id = ?`, [id]);
    return categoria;
};

const deleteCategoria = async (id) => {
    const [result] = await db.query('DELETE FROM Categoria WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

const deleteCategoriaByProyecto = async (id_proyecto) => {
    const [result] = await db.query('DELETE FROM Categoria WHERE id_proyecto = ?', [id_proyecto]);
    return result.affectedRows > 0;
}

module.exports = {
    createCategoria,
    updateNombreCategoria,
    getCategoriasByProyecto,
    getCategoriaById,
    deleteCategoria,
    deleteCategoriaByProyecto
};