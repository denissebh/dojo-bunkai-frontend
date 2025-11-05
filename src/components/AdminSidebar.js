import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSidebar({ activeView, onSelectView }) {
  const navigate = useNavigate();
 const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
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
              Agregar Resultados de Torneo
            </button>
            </li>

          <li>
            <button
              className={`sidebar-btn ${activeView === 'addExamResult' ? 'active' : ''}`}
              onClick={() => onSelectView('addExamResult')}
           >
            Agregar Resultados de Examen
             </button>
         </li>
          <li>
             <button
            className={`sidebar-btn ${activeView === 'addSeminarResult' ? 'active' : ''}`}
            onClick={() => onSelectView('addSeminarResult')}
            >
            Agregar Asistencia a Seminario
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
          <li>
          <button className={`sidebar-btn ${activeView === 'validateRenade' ? 'active' : ''}`}
             onClick={() => onSelectView('validateRenade')}
            >
            Validar RENADE
           </button>
          </li>
          <li>
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