import React, { useState } from 'react';
import ProfesorSidebar from '../components/ProfesorSidebar';
import ListaAlumnos from '../components/ListaAlumnos';
import RenadeSection from '../components/RenadeSection';

function ProfesorDashboardPage() {
  const [activeView, setActiveView] = useState('listaAlumnos');

  const renderActiveView = () => {
    switch (activeView) {
      case 'listaAlumnos':
        return <ListaAlumnos />;
      case 'renade': 
        return <RenadeSection />;
      // Aquí añadiremos los otros componentes en el futuro
      case 'misEstadisticas':
        return <h3>Mis Estadísticas (En construcción)</h3>;
      case 'calendario':
        return <h3>Calendario de Eventos (En construcción)</h3>;
      case 'comunicados':
        return <h3>Comunicados (En construcción)</h3>;
      default:
        return <ListaAlumnos />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Panel de Profesor</h2>
        <div className="dashboard-layout">
          <ProfesorSidebar activeView={activeView} onSelectView={setActiveView} />
          <main className="dashboard-main-content">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfesorDashboardPage;