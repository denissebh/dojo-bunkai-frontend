import React, { useState } from 'react';
import AlumnoSidebar from '../components/AlumnoSidebar';
import RenadeSection from '../components/RenadeSection';
// Suponiendo que el perfil del alumno es otro componente
// import AlumnoProfileView from '../components/AlumnoProfileView';

function AlumnoDashboardPage() {
  const [activeView, setActiveView] = useState('miPerfil');

  const renderActiveView = () => {
    switch (activeView) {
      case 'renade':
        return <RenadeSection />;
      case 'miPerfil':
      default:
        return <h3>Mi Perfil (En construcción)</h3>;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Panel de Alumno</h2>
        <div className="dashboard-layout">
          <AlumnoSidebar activeView={activeView} onSelectView={setActiveView} />
          <main className="dashboard-main-content">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}
export default AlumnoDashboardPage;