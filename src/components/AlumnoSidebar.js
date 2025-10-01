import React from 'react';

function AlumnoSidebar({ activeView, onSelectView }) {
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <button className={`sidebar-btn ${activeView === 'miPerfil' ? 'active' : ''}`} onClick={() => onSelectView('miPerfil')}>Mi Perfil</button>
          </li>
          <li>
            <button className={`sidebar-btn ${activeView === 'renade' ? 'active' : ''}`} onClick={() => onSelectView('renade')}>Solicitud RENADE</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
export default AlumnoSidebar;