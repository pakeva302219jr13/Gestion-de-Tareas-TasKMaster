import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="home-page">
      <header>
        <nav className="navbar">
          <div className="logo">TaskMaster JR®</div>
          <ul className="nav-links">
            {!token ? (
              <>
                <li><Link to="/login" className="nav-link">Iniciar Sesión</Link></li>
                <li><Link to="/register" className="nav-link">Registrarse</Link></li>
              </>
            ) : (
              <li><Link to="/tasks" className="nav-link">Ver Tareas</Link></li>
            )}
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h1>Bienvenido a TaskMaster JR®</h1>
          {!token ? (
            <div>
              <p>Organiza y gestiona tus tareas de manera fácil y eficiente.</p>
              <div className="btn-container">
                <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
                <Link to="/register" className="btn btn-secondary">Registrarse</Link>
              </div>
            </div>
          ) : (
            <div>
              <p>¡Estás conectado! Comienza a gestionar tus tareas de inmediato.</p>
              <Link to="/tasks" className="btn btn-primary">Ver mis Tareas</Link>
            </div>
          )}
        </section>
        <section className="image-section">
          <img src="images/image-taskaster-1.png" alt="TaskMaster 1" className="hero-image" />
          <img src="images/image-taskmaster-2.png" alt="TaskMaster 2" className="hero-image" />
          <img src="images/image-taskmaster-3.png" alt="TaskMaster 3" className="hero-image" />
        </section>
      </main>

      <footer>
        <p>© 2024 TaskMaster. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
