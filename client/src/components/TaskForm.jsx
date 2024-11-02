import React, { useState } from 'react';

const TaskForm = ({ onCreateTask }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Baja');
  const [category, setCategory] = useState('Trabajo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !date) return;
    onCreateTask({ task, date, priority, category });
    setTask('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Trabajo">Trabajo</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default TaskForm;
