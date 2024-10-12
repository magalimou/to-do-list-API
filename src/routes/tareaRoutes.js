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
router.get('/proyecto/:id_proyecto', tareaController.getTareasByProyecto);
//obtener tarea por id
router.get('/:id', tareaController.getTareaById);
//obtener tareas completadas
router.get('/usuario/:id_usuario/finalizadas', tareaController.getTareasFinalizadasByUsuario);




module.exports = router;
