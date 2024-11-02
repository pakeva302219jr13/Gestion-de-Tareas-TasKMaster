import React from 'react';

const TaskItem = ({ task, onDelete, onComplete }) => {
  return (
    <li className="task-item">
      <span>{task.title}</span>
      <span>{task.dueDate}</span>
      <span>{task.priority}</span>
      <span>{task.category}</span>
      <button onClick={() => onComplete(task.id)}>
        {task.completed ? 'Completada' : 'Marcar como completada'}
      </button>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </li>
  );
};

export default TaskItem;
