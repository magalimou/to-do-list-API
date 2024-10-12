const db = require('../db');

const createTarea = async (id_proyecto, titulo, descripcion = '', estado = 'Por hacer', prioridad = 'Baja') => {
  const [result] = await db.query(
    'INSERT INTO Tarea (id_proyecto, titulo, descripcion, estado, prioridad) VALUES (?, ?, ?, ?, ?)',
    [id_proyecto, titulo, descripcion, estado, prioridad]
  );
  return result.insertId;
};

const deleteTareaById = async (id) => {
  const [result] = await db.query('DELETE FROM Tarea WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

// borrar todas las tareas de un proyecto
const deleteTareasByProyecto = async (id_proyecto) => {
  const [result] = await db.query('DELETE FROM Tarea WHERE id_proyecto = ?', [id_proyecto]);
  return result.affectedRows > 0;
};

const updateTarea = async (id, { titulo, descripcion, estado, prioridad }) => {
  const [result] = await db.query(
    'UPDATE Tarea SET titulo = ?, descripcion = ?, estado = ?, prioridad = ? WHERE id = ?',
    [titulo, descripcion, estado, prioridad, id]
  );
  return result.affectedRows > 0;
};

const getTareasByProyecto = async (id_proyecto) => {
  const [tareas] = await db.query(`
    SELECT
      Tarea.id AS id_tarea,  
      Tarea.id_proyecto,
      Tarea.titulo,
      Tarea.descripcion,
      Tarea.estado,
      Tarea.prioridad 
    FROM Tarea 
    WHERE id_proyecto = ?`, [id_proyecto]);
  return tareas;
};

const getTareaById = async (id) => {
  const [tarea] = await db.query(`
    SELECT 
      Tarea.id AS id_tarea,  
      Tarea.id_proyecto,
      Tarea.titulo,
      Tarea.descripcion,
      Tarea.estado,
      Tarea.prioridad 
    FROM Tarea 
    WHERE id = ?`, [id]);
  return tarea[0];
}

const getTareasFinalizadasByUsuario = async (id_usuario) => {
  const [tareas] = await db.query(`
    SELECT
      Tarea.id AS id_tarea,  
      Tarea.id_proyecto,
      Tarea.titulo,
      Tarea.descripcion,
      Tarea.estado,
      Tarea.prioridad
    FROM Tarea
    JOIN Proyecto ON Tarea.id_proyecto = Proyecto.id
    WHERE Proyecto.id_usuario = ? AND Tarea.estado = 'Finalizado'
  `, [id_usuario]);

  return tareas;
};

module.exports = {
  createTarea,
  deleteTareaById,
  deleteTareasByProyecto,
  updateTarea,
  getTareasByProyecto,
  getTareaById,
  getTareasFinalizadasByUsuario
};
