const db = require('../db');

const createProyecto = async (id_usuario, nombre, descripcion) => {
  const [result] = await db.query(
    'INSERT INTO Proyecto (id_usuario, nombre, descripcion) VALUES (?, ?, ?)',
    [id_usuario, nombre, descripcion]
  );
  return result.insertId;
};

module.exports = {
  createProyecto
};
