import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSidebar({ activeView, onSelectView }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // En una app real, aquí limpiarías el estado de autenticación
    navigate('/login');
  };
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <button 
              className={`sidebar-btn ${activeView === 'viewPayments' ? 'active' : ''}`}
              onClick={() => onSelectView('viewPayments')}
            >
              Ver Pagos
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-btn ${activeView === 'manageEvents' ? 'active' : ''}`}
              onClick={() => onSelectView('manageEvents')}
            >
              Gestionar Eventos
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-btn ${activeView === 'createProfessor' ? 'active' : ''}`}
              onClick={() => onSelectView('createProfessor')}
            >
              Crear Profesor
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-btn ${activeView === 'addTournamentResult' ? 'active' : ''}`}
              onClick={() => onSelectView('addTournamentResult')}
            >
              Agregar Resultados
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-btn ${activeView === 'editProfiles' ? 'active' : ''}`}
              onClick={() => onSelectView('editProfiles')}
            >
              Editar Perfiles
            </button>
            <button className={`sidebar-btn ${activeView === 'validateRenade' ? 'active' : ''}`} onClick={() => onSelectView('validateRenade')}>Validar RENADE</button>
  </li>
  <li>
    <button className={`sidebar-btn ${activeView === 'validatePayments' ? 'active' : ''}`} onClick={() => onSelectView('validatePayments')}>Validar Pagos</button>
  
            <button onClick={handleLogout} className="logout-btn">
        Cerrar Sesión
      </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;