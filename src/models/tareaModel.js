const db = require('../db');

const createTarea = async (id_categoria, titulo, descripcion = '', estado = 'Por hacer', prioridad = 'Baja') => {
  const [result] = await db.query(
    'INSERT INTO Tarea (id_categoria, titulo, descripcion, estado, prioridad) VALUES (?, ?, ?, ?, ?)',
    [id_categoria, titulo, descripcion, estado, prioridad]
  );
  return result.insertId;
};

const deleteTareaById = async (id) => {
    const [result] = await db.query('DELETE FROM Tarea WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

const updateTarea = async (id, { titulo, descripcion, estado, prioridad }) => {
    const [result] = await db.query(
      'UPDATE Tarea SET titulo = ?, descripcion = ?, estado = ?, prioridad = ? WHERE id = ?',
      [titulo, descripcion, estado, prioridad, id]
    );
    return result.affectedRows > 0;
};

const getTareasByCategoria = async (id_categoria) => {
    const [tareas] = await db.query('SELECT * FROM Tarea WHERE id_categoria = ?', [id_categoria]);
    return tareas;
};

const getTareaById = async (id) => {
    const [tarea] = await db.query('SELECT * FROM Tarea WHERE id = ?', [id]);
    return tarea[0];
}

module.exports = {
  createTarea,
  deleteTareaById,
  updateTarea,
  getTareasByCategoria,
  getTareaById
};