// En el archivo Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // función para cerrar sesión
  const handleLogout = () => {
    // elimina el token del localStorage
    localStorage.removeItem('token');
    // redirige al usuario a la página de inicio
    navigate('/');
  };

  const token = localStorage.getItem('token'); // Verifica si hay token

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex justify-around">
        {token ? (
          <>
            <li><Link to="/tasks">Tareas</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
          </>
        ) : (
          // aquí lo dejo vacío o agregar algún otro contenido despues
          null
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
