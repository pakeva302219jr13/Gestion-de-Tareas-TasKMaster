import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // para redireccionar a otra página después de la acción
import { registerUser } from '../services/api'; 

const RegisterPage = () => {
  const navigate = useNavigate(); // inicializamos useNavigate para redirigir después del registro
  const [nombre, setNombre] = useState(''); // estado para el nombre del usuario
  const [email, setEmail] = useState(''); // estado para el correo electrónico
  const [password, setPassword] = useState(''); // estado para la contraseña
  const [error, setError] = useState(''); // estado para manejar los mensajes de error
  const [success, setSuccess] = useState(''); // stado para manejar los mensajes de éxito

  // función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault(); // anexamos para evitar que el formulario recargue la página por defecto como me sucedia
    setError(''); // aui limpiamos el error anterior (si lo había)
    setSuccess(''); // aquiLimpiamos el mensaje de éxito anterior

    // aui nos aseguramos de que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return; 
    }

    try {
      // aqui llamamos a la función que envía los datos de registro al backend
      const response = await registerUser({ nombre, email, password });

      
      if (response.success) {
        setSuccess('Registro exitoso. ¡Ahora puedes iniciar sesión!');
        // aqui redirigimos al login después de 3 segundos
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.message || 'Error al registrarse. Intente nuevamente.');
      }
    } catch (err) {
      console.error("Error en el registro:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error al registrarse. Intente nuevamente.');
    }
  };

  return (
    <div className="register-page">
      <h2>Registrarse</h2>

      {/* ormulario de registro */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre} //valor imput nombre
          onChange={(e) => setNombre(e.target.value)} 
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email} //  valor del input es el estado 'email'
          onChange={(e) => setEmail(e.target.value)} ></input>
        <input
          type="password"
          placeholder="Contraseña"
          value={password} //  valor  estado 'password'
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* aqui ostramos el mensaje de éxito si el registro fue exitoso */}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        
        {/* Botón para enviar el formulario */}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
