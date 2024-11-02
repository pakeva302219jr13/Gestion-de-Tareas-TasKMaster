import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Captura el token de la URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('');
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      console.log("Token:", token); // verificar que el token esté disponible
      console.log("Enviando solicitud para restablecer contraseña");

      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        password,
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setError('');
        console.log("Contraseña restablecida exitosamente");
        navigate('/login'); // redirigir a login si es exitoso
      } else {
        setMessage('');
        setError(response.data.message || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      setMessage('');
      setError(
        error.response?.data?.message || 'Error al conectar con el servidor para restablecer la contraseña'
      );
      console.error("Error en restablecimiento de contraseña:", error);
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
