const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.post('/', proyectoController.createProyecto);
//actualizar el nombre de un proyecto
router.patch('/:id', proyectoController.updateNombreProyecto);
//listar todos los proyectos de un usuario
router.get('/usuario/:id_usuario', proyectoController.getProyectosByUsuario);
//borrar un proyecto por id
router.delete('/:id', proyectoController.deleteProyecto);

module.exports = router;