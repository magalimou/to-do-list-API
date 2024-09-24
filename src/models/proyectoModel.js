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

module.exports = {
  createProyecto,
  updateNombreProyecto,
  getProyectosByUsuario
};
