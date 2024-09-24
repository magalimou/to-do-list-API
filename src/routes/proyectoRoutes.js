const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.post('/', proyectoController.createProyecto);

module.exports = router;