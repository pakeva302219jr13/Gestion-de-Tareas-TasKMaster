import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recoverPassword } from '../services/api';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Llama a la función `recoverPassword` y pasa solo el correo electrónico
      const response = await recoverPassword(email);
      
      if (response.success) {
        setMessage('Por favor, revisa tu correo electrónico para restablecer la contraseña.');
        setError(''); 
        // Redirige a la página de login después de un breve tiempo
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.message || 'Error al enviar la solicitud de recuperación de contraseña.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al conectar con el servidor para recuperar la contraseña. Intenta nuevamente.');
    }
  };

  return (
    <div className="recover-password-page">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleRecoverPassword}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default RecoverPassword;
