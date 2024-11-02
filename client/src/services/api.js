import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// función para iniciar sesión
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// unción para recuperar contraseña
export const recoverPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/recover-password`, { email });
  return response.data;
};

// función para resetear la contraseña
export const resetPassword = async (token, passwordData) => {
  const response = await axios.post(`${API_URL}/reset-password`, {
    token,
    ...passwordData,
  });
  return response.data;
};


// función para obtener el perfil del usuario
export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// función para actualizar el perfil del usuario
export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// función para obtener todas las tareas
export const getTasks = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// función para crear una nueva tarea
export const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.post(`${API_URL}/tasks/create`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// función para actualizar una tarea existente
export const updateTask = async (taskId, taskData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// función para eliminar una tarea
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// función para cerrar sesión (eliminar el token del almacenamiento local)
export const logoutUser = () => {
  localStorage.removeItem('token');
};

// función para actualizar la contraseña del usuario
export const updateUserPassword = async (passwordData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await axios.put(`${API_URL}/auth/update-password`, passwordData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
