import React from 'react';

function ProfesorSidebar({ activeView, onSelectView }) {
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <button
              className={`sidebar-btn ${activeView === 'listaAlumnos' ? 'active' : ''}`}
              onClick={() => onSelectView('listaAlumnos')}
            >
              Lista de Alumnos
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeView === 'misEstadisticas' ? 'active' : ''}`}
              onClick={() => onSelectView('misEstadisticas')}
            >
              Mis Estadísticas
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeView === 'calendario' ? 'active' : ''}`}
              onClick={() => onSelectView('calendario')}
            >
              Calendario de Eventos
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeView === 'comunicados' ? 'active' : ''}`}
              onClick={() => onSelectView('comunicados')}
            >
              Comunicados
            </button>
          </li>
          <li>
            <button
              className={`sidebar-btn ${activeView === 'renade' ? 'active' : ''}`}
              onClick={() => onSelectView('renade')}
            >
              Solicitud RENADE
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default ProfesorSidebar;