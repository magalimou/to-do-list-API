const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

//crear categoria
router.post('/', categoriaController.createCategoria);
//actualizar el nombre de una categoria
router.patch('/:id', categoriaController.updateNombreCategoria);
//listar todas las categorias de un proyecto
router.get('/proyecto/:id_proyecto', categoriaController.getCategoriasByProyecto);
//listar una categoria por id
router.get('/:id', categoriaController.getCategoriaById);
//borrar una categoria por id 
router.delete('/:id', categoriaController.deleteCategoriaById);

module.exports = router;