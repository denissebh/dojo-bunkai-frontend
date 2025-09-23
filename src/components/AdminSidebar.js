import React from 'react';

function AdminSidebar({ activeView, onSelectView }) {
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
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;