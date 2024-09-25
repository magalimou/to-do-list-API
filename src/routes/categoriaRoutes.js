const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

//crear categoria
router.post('/', categoriaController.createCategoria);
//actualizar el nombre de una categoria
router.patch('/:id', categoriaController.updateNombreCategoria);
//listar todas las categorias de un proyecto
router.get('/proyecto/:id_proyecto', categoriaController.getCategoriasByProyecto);
//borrar una categoria por id de proyecto
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;