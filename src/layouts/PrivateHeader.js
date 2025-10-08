import React from 'react';
import { useNavigate } from 'react-router-dom';

// Recibe el título de la página como un "prop"
function PrivateHeader({ title }) {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');

  return (
    <header className="private-header">
      <div className="container">
        <span className="panel-title">{title}</span>
        <button onClick={handleLogout} className="logout-btn-header">
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}
export default PrivateHeader;