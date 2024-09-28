const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

//crear una nueva tarea
router.post('/', tareaController.createTarea);
//borrar tarea por su id
router.delete('/:id', tareaController.deleteTareaById);
//editar tarea
router.patch('/:id', tareaController.updateTarea);
//obtener todas las tareas de una categoria
router.get('/categoria/:id_categoria', tareaController.getTareasByCategoria);
//obtener tarea por id
router.get('/:id', tareaController.getTareaById);



module.exports = router;
