const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.createUser);
router.post('/login', usuarioController.loginUser);
router.get('/:id', usuarioController.getUserById);

module.exports = router;
