const db = require('../db');

const createProyecto = async (id_usuario, nombre, descripcion) => {
  const [result] = await db.query(
    'INSERT INTO Proyecto (id_usuario, nombre, descripcion) VALUES (?, ?, ?)',
    [id_usuario, nombre, descripcion]
  );
  return result.insertId;
};

const updateNombreProyecto = async (id, nombre) => {
  const [result] = await db.query(
    'UPDATE Proyecto SET nombre = ? WHERE id = ?',
    [nombre, id]
  );
  return result.affectedRows > 0;
};

const getProyectosByUsuario = async (id_usuario) => {
  const [rows] = await db.query(
    'SELECT * FROM Proyecto WHERE id_usuario = ?',
    [id_usuario]
  );
  return rows;
};

const getProyectoById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM Proyecto WHERE id = ?',
    [id]
  );
  return rows[0];
};

const deleteProyecto = async (id) => {
  const [result] = await db.query(
    'DELETE FROM Proyecto WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  createProyecto,
  updateNombreProyecto,
  getProyectosByUsuario,
  getProyectoById,
  deleteProyecto
};
