import connection from '../config/basedatos.js';

// Función para crear una tarea
export const createTask = (usuario_id, descripcion, fecha_vencimiento, prioridad, estado, categoria) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO tareas (usuario_id, descripcion, fecha_vencimiento, prioridad, estado, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [usuario_id, descripcion, fecha_vencimiento, prioridad, estado, categoria], (err, results) => {
      if (err) {
        reject({
          status: 500,
          success: false,
          message: 'Error al crear la tarea en la base de datos'
        });
      } else {
        resolve({
          status: 201,
          success: true,
          message: 'Tarea creada exitosamente',
          taskId: results.insertId
        });
      }
    });
  });
};

// función para obtener todas las tareas de un usuario con un filtro de estado
export const getUserTasksWithFilter = (usuario_id, estado) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM tareas WHERE usuario_id = ?';
    const params = [usuario_id];

    if (estado) {
      query += ' AND estado = ?';
      params.push(estado);
    }

    connection.query(query, params, (err, results) => {
      if (err) {
        reject({
          status: 500,
          success: false,
          message: 'Error al obtener las tareas'
        });
      } else {
        resolve({
          status: 200,
          success: true,
          message: 'Tareas obtenidas exitosamente',
          tasks: results
        });
      }
    });
  });
};

// función para obtener una tarea por su ID
export const getTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tareas WHERE id = ?';
    connection.query(query, [taskId], (err, results) => {
      if (err) {
        reject({
          status: 500,
          success: false,
          message: 'Error al obtener la tarea'
        });
      } else if (results.length === 0) {
        resolve({
          status: 404,
          success: false,
          message: 'Tarea no encontrada'
        });
      } else {
        resolve({
          status: 200,
          success: true,
          message: 'Tarea obtenida exitosamente',
          task: results[0]
        });
      }
    });
  });
};

// función para actualizar una tarea
export const updateTask = (taskId, descripcion, fecha_vencimiento, prioridad, estado, categoria) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE tareas SET descripcion = ?, fecha_vencimiento = ?, prioridad = ?, estado = ?, categoria = ? WHERE id = ?';
    connection.query(query, [descripcion, fecha_vencimiento, prioridad, estado, categoria, taskId], (err, results) => {
      if (err) {
        reject({
          status: 500,
          success: false,
          message: 'Error al actualizar la tarea'
        });
      } else {
        resolve({
          status: 200,
          success: true,
          message: 'Tarea actualizada correctamente'
        });
      }
    });
  });
};

// función para eliminar una tarea
export const deleteTask = (taskId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tareas WHERE id = ?';
    connection.query(query, [taskId], (err, results) => {
      if (err) {
        reject({
          status: 500,
          success: false,
          message: 'Error al eliminar la tarea'
        });
      } else {
        resolve({
          status: 200,
          success: true,
          message: 'Tarea eliminada correctamente'
        });
      }
    });
  });
};
