import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../services/api';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData && profileData.success) {
          setUser(profileData.data);
          setName(profileData.data.nombre);
          setEmail(profileData.data.email);
        } else {
          setError('No se pudo cargar el perfil del usuario.');
        }
      } catch (err) {
        setError('Error al cargar el perfil.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await updateUserProfile({ nombre: name, email });
      if (response.success) {
        setMessage('Perfil actualizado correctamente.');
      } else {
        setError('No se pudo actualizar el perfil.');
      }
    } catch (err) {
      setError('Error al actualizar el perfil.');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setError('');

    try {
      const response = await updateUserPassword({ passwordActual, passwordNueva });
      if (response.success) {
        setPasswordMessage('Contraseña actualizada correctamente.');
        setPasswordActual('');
        setPasswordNueva('');
      } else {
        setError('Error al actualizar la contraseña.');
      }
    } catch (err) {
      setError('Error al actualizar la contraseña.');
    }
  };

  return (
    <div className="profile-page">
      <h2>Perfil de Usuario</h2>
      
      {/* Información del usuario */}
      <div>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo electrónico:</strong> {user.email}</p>
      </div>

      {/* Formulario de actualización de perfil */}
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit">Actualizar Perfil</button>
      </form>

      {/* Formulario de cambio de contraseña */}
      <form onSubmit={handleUpdatePassword}>
        <input
          type="password"
          placeholder="Contraseña Actual"
          value={passwordActual}
          onChange={(e) => setPasswordActual(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={passwordNueva}
          onChange={(e) => setPasswordNueva(e.target.value)}
          required
        />
        {passwordMessage && <p style={{ color: 'green' }}>{passwordMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Actualizar Contraseña</button>
      </form>
    </div>
  );
};

export default ProfilePage;
