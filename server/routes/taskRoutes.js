import express from 'express';
import { 
  createTaskController, 
  getUserTasksController, 
  updateTaskController, 
  deleteTaskController 
} from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ruta para crear una nueva tarea (protegida por token)
router.post('/create', verifyToken, createTaskController);

// ruta para obtener todas las tareas de un usuario autenticado
router.get('/', verifyToken, getUserTasksController);

// ruta para actualizar una tarea específica
router.put('/:taskId', verifyToken, updateTaskController);

// uta para eliminar una tarea específica
router.delete('/:taskId', verifyToken, deleteTaskController);

export default router;
