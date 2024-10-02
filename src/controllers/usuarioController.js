const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    const userId = await usuarioModel.createUser(nombre, email, contrasena);
    res.status(201).json({ id_usuario: userId });
  } catch (error) {
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    } else {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }
}

const loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const user = await usuarioModel.loginUser(email, contrasena);

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usuarioModel.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById
};
