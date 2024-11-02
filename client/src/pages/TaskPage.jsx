import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import ReactQuill from 'react-quill'; // importando el editor de texto enriquecido
import 'react-quill/dist/quill.snow.css'; // estilos para el editor de texto enriquecido

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    descripcion: '',
    fechaVencimiento: '',
    prioridad: 'Media',
    estado: 'pendiente',
    categoria: 'trabajo'
  });
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData.tasks || []);
      } catch (err) {
        setError('No se pudieron obtener las tareas.');
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    // Validación de la fecha de vencimiento (fecha a futuro)
    if (newTask.fechaVencimiento && new Date(newTask.fechaVencimiento) < new Date()) {
      setError('La fecha de vencimiento debe ser en el futuro.');
      return;
    }

    if (!newTask.descripcion || !newTask.fechaVencimiento || !newTask.categoria) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      if (editMode) {
        await updateTask(taskToEdit.id, newTask); // ectualiza la tarea
        setEditMode(false);
        setTaskToEdit(null);
      } else {
        await createTask(newTask); // Crea una nueva tarea
      }

      const tasksData = await getTasks();
      setTasks(tasksData.tasks);
      setNewTask({
        descripcion: '',
        fechaVencimiento: '',
        prioridad: 'Media',
        estado: 'pendiente',
        categoria: 'trabajo'
      });
    } catch (err) {
      setError('Error al crear o modificar la tarea.');
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setNewTask({
      descripcion: task.descripcion,
      fechaVencimiento: task.fechaVencimiento,
      prioridad: task.prioridad,
      estado: task.estado,
      categoria: task.categoria
    });
    setEditMode(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId); // elimina la tarea
      const tasksData = await getTasks(); 
      setTasks(tasksData.tasks);
    } catch (err) {
      setError('Error al eliminar la tarea.');
    }
  };

  return (
    <div>
      <h2>{editMode ? 'Modificar Tarea' : 'Crear Tarea'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateTask}>
        <label>
          Descripción:
          <ReactQuill
            value={newTask.descripcion}
            onChange={(value) => setNewTask({ ...newTask, descripcion: value })}
            theme="snow"
          />
        </label>
        <label>
          Fecha de Vencimiento:
          <input
            type="date"
            value={newTask.fechaVencimiento}
            onChange={(e) => setNewTask({ ...newTask, fechaVencimiento: e.target.value })}
          />
        </label>
        <label>
          Prioridad:
          <select
            value={newTask.prioridad}
            onChange={(e) => setNewTask({ ...newTask, prioridad: e.target.value })}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </label>
        <label>
          Estado:
          <select
            value={newTask.estado}
            onChange={(e) => setNewTask({ ...newTask, estado: e.target.value })}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </label>
        <label>
          Categoría:
          <select
            value={newTask.categoria}
            onChange={(e) => setNewTask({ ...newTask, categoria: e.target.value })}
          >
            <option value="trabajo">Trabajo</option>
            <option value="personal">Personal</option>
            <option value="empresarial">Empresarial</option>
          </select>
        </label>
        <button type="submit">{editMode ? 'Modificar Tarea' : 'Crear Tarea'}</button>
        {editMode && (
          <button
            onClick={() => {
              setEditMode(false);
              setNewTask({
                descripcion: '',
                fechaVencimiento: '',
                prioridad: 'Media',
                estado: 'pendiente',
                categoria: 'trabajo'
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Tareas Creadas</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <div dangerouslySetInnerHTML={{ __html: task.descripcion }}></div>
              <p>Prioridad: {task.prioridad}</p>
              <p>Estado: {task.estado || 'No asignado'}</p>
              <p>Vencimiento: {task.fechaVencimiento ? new Date(task.fechaVencimiento).toLocaleDateString() : 'No asignada'}</p>
              <p>Categoría: {task.categoria || 'No asignada'}</p>
              <button onClick={() => handleEditTask(task)}>Editar</button>
              <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <li>No hay tareas disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskPage;
