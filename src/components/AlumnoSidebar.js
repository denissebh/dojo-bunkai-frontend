import React from 'react';
import userAvatar from '../assets/images/alumno.jpg'; 
import { useNavigate } from 'react-router-dom'; 

function AlumnoSidebar({ alumno, activeView, onSelectView }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/login');
  };
  if (!alumno) return null; 

  return (
    <aside className="admin-sidebar student-sidebar">
      <div className="sidebar-profile">
        <img src={userAvatar} alt="Foto de perfil del alumno" className="profile-avatar" />
        <h4>{`${alumno.nombre || ''} ${alumno.apellido_paterno || ''} ${alumno.apellido_materno || ''}`}</h4>
        <span>{alumno.grado}</span>
      </div>
      <nav>
        <ul>
        <li>
            <button
              className={`sidebar-btn ${activeView === 'miPerfil' ? 'active' : ''}`} onClick={() => onSelectView('miPerfil')}> Mi Perfil
            </button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'pagos' ? 'active' : ''}`} onClick={() => onSelectView('pagos')}>Pagos</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'examenes' ? 'active' : ''}`} onClick={() => onSelectView('examenes')}>Exámenes</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'torneos' ? 'active' : ''}`} onClick={() => onSelectView('torneos')}>Torneos</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'seminarios' ? 'active' : ''}`} onClick={() => onSelectView('seminarios')}>Seminarios</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'renade' ? 'active' : ''}`} onClick={() => onSelectView('renade')}>Solicitud RENADE</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'editar' ? 'active' : ''}`} onClick={() => onSelectView('editar')}>Editar Datos</button>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout} className="logout-btn">
        Cerrar Sesión
      </button>
    </aside>
  );
}
export default AlumnoSidebar;