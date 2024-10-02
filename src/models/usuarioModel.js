const db = require('../db');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Usuario WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (nombre, email, contrasena) => {
  // Verificar si el correo ya está registrado
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contrasena, salt);
  
  const [result] = await db.query(
    'INSERT INTO Usuario (nombre, email, contrasena) VALUES (?, ?, ?)',
    [nombre, email, hashedPassword]
  );
  
  return result.insertId;
};

const loginUser = async (email, contrasena) => {
  const [rows] = await db.query('SELECT * FROM Usuario WHERE email = ?', [email]);
  
  if (rows.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = rows[0];

  // Comparar la contraseña proporcionada con la almacenada
  const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
  
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  return user;
};

const getUserById = async (id) => {
  const [rows] = await db.query(`
    SELECT 
      Usuario.id AS id_usuario,
      Usuario.nombre,
      Usuario.email 
    FROM Usuario 
    WHERE Usuario.id = ?`, [id]);
  return rows[0];
};

module.exports = {
  createUser,
  loginUser,
  getUserById
};
