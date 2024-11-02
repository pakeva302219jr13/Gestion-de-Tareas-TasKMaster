
import connection from '../config/basedatos.js';

// función para encontrar usuario por email
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error al buscar el usuario en la base de datos:', err); 
        return reject({
          success: false,
          message: 'Error al buscar el usuario en la base de datos',
        });
      }

      if (results.length === 0) {
        return resolve({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      return resolve({
        success: true,
        user: results[0],
      });
    });
  });
};

// Función para crear nuevo usuario
export const createUser = (nombre, email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    connection.query(query, [nombre, email, password], (err, results) => {
      if (err) {
        console.error('Error al crear el usuario en la base de datos:', err); 
        return reject({
          success: false,
          message: 'Error al crear el usuario en la base de datos',
        });
      }

      return resolve({
        success: true,
        userId: results.insertId,
      });
    });
  });
};

// unción para actualizar el perfil o la contraseña del usuario
export const updateUserById = (userId, data) => {
  return new Promise((resolve, reject) => {
    const { nombre, email, password } = data;
    let query = 'UPDATE usuarios SET';
    const params = [];

    if (nombre) {
      query += ' nombre = ?,';
      params.push(nombre);
    }
    if (email) {
      query += ' email = ?,';
      params.push(email);
    }
    if (password) {
      query += ' password = ?,';
      params.push(password);
    }

    query = query.slice(0, -1);
    query += ' WHERE id = ?';
    params.push(userId);

    connection.query(query, params, (err) => {
      if (err) {
        console.error('Error al actualizar el usuario en la base de datos:', err);
        return reject({
          success: false,
          message: 'Error al actualizar el usuario en la base de datos',
        });
      }

      return resolve({
        success: true,
        message: 'Usuario actualizado exitosamente',
      });
    });
  });
};

// Función para encontrar usuario por ID
export const findUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error al buscar el usuario por ID en la base de datos:', err); 
        return reject({
          success: false,
          message: 'Error al buscar el usuario en la base de datos',
        });
      }

      if (results.length === 0) {
        return resolve({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      return resolve({
        success: true,
        user: results[0],
      });
    });
  });
};
