import { 
  createTask, 
  getUserTasksWithFilter, 
  updateTask, 
  deleteTask, 
  getTaskById 
} from '../models/taskModel.js';

// controlador para crear una tarea
export const createTaskController = (req, res) => {
  const { descripcion, fecha_vencimiento, prioridad, estado, categoria } = req.body;
  const usuario_id = req.userId; // ID de usuario autenticado

  createTask(usuario_id, descripcion, fecha_vencimiento, prioridad, estado, categoria)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Tarea creada exitosamente",
        taskId: result.taskId
      });
    })
    .catch((error) => {
      console.error("Error al crear la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo crear la tarea"
      });
    });
};

// controlador para obtener todas las tareas de un usuario con filtro 
export const getUserTasksController = (req, res) => {
  const usuario_id = req.userId;
  const { estado } = req.query; // filtro de estado

  getUserTasksWithFilter(usuario_id, estado)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Tareas obtenidas exitosamente",
        tasks: result.tasks
      });
    })
    .catch((error) => {
      console.error("Error al obtener las tareas:", error);
      res.status(500).json({
        success: false,
        message: "No se pudieron obtener las tareas"
      });
    });
};

// controlador para obtener una tarea por su ID
export const getTaskByIdController = (req, res) => {
  const { taskId } = req.params;

  getTaskById(taskId)
    .then((result) => {
      res.status(200).json({
        success: true,
        task: result.task
      });
    })
    .catch((error) => {
      console.error("Error al obtener la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo obtener la tarea"
      });
    });
};

// controlador para actualizar una tarea
export const updateTaskController = (req, res) => {
  const { taskId } = req.params;
  const { descripcion, fecha_vencimiento, prioridad, estado, categoria } = req.body;

  updateTask(taskId, descripcion, fecha_vencimiento, prioridad, estado, categoria)
    .then((result) => {
      res.status(result.status).json({
        success: true,
        message: "Tarea actualizada correctamente"
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "no se pudo actualizar la tarea"
      });
    });
};

// controlador para eliminar una tarea
export const deleteTaskController = (req, res) => {
  const { taskId } = req.params;

  deleteTask(taskId)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Tarea eliminada correctamente"
      });
    })
    .catch((error) => {
      console.error("Error al eliminar la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo eliminar la tarea"
      });
    });
};
