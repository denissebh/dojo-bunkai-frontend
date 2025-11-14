import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfesorSidebar({ profesor, activeView, onSelectView }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (!profesor) return null; 

  return (
    <aside className="admin-sidebar student-sidebar">
      <div className="sidebar-profile">
        <img src={profesor.foto} alt={`Foto de ${profesor.nombre}`} className="profile-avatar" />
        <h4>{`${profesor.nombre || ''} ${profesor.apellido_paterno || ''} ${profesor.apellido_materno || ''}`}</h4>
        <span>{profesor.grado}</span>
      </div>
      <nav>
        <ul>
          {/* --- NUEVO BOTÓN: MI PERFIL --- */}
          <li>
            <button 
              className={`sidebar-btn ${activeView === 'miPerfil' ? 'active' : ''}`} 
              onClick={() => onSelectView('miPerfil')}
            >
              Mi Perfil
            </button>
          </li>

          <li>
            <button className={`sidebar-btn ${activeView === 'listaAlumnos' ? 'active' : ''}`} onClick={() => onSelectView('listaAlumnos')}>Lista de Alumnos</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'misEstadisticas' ? 'active' : ''}`} onClick={() => onSelectView('misEstadisticas')}>Mis Estadísticas</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'calendario' ? 'active' : ''}`} onClick={() => onSelectView('calendario')}>Calendario de Eventos</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'comunicados' ? 'active' : ''}`} onClick={() => onSelectView('comunicados')}>Comunicados</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'renade' ? 'active' : ''}`} onClick={() => onSelectView('renade')}>Solicitud RENADE</button>
          </li>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </ul>
      </nav>
    </aside>
  );
}

export default ProfesorSidebar;