import React, { useState } from 'react';

// Importa todos los componentes
import ProfesorSidebar from '../components/ProfesorSidebar';
import ListaAlumnos from '../components/ListaAlumnos';
import RenadeSection from '../components/RenadeSection';
import EstadisticasView from '../components/EstadisticasView';
import CalendarioEventosView from '../components/CalendarioEventosView';
import ComunicadosView from '../components/ComunicadosView';

// Importa la foto de ejemplo
import fotoProfesor from '../assets/images/Kyoshi1.jpeg';

// --- DATOS DE EJEMPLO PARA EL PROFESOR "LOGUEADO" ---
const mockProfesorLogueado = {
  id: 101,
  nombre: 'Francisco Barroso de Luna',
  grado: 'Kyoshi - Fundador',
  foto: fotoProfesor,
  estadisticas: [
    { torneo: 'Campeonato Mundial WUKF 2022', resultado: 'Medalla de Bronce - Kata' },
    { torneo: 'Panamericano Shudokan 2021', resultado: 'Medalla de Oro - Kumite' }
  ]
};

// --- DATOS DE EJEMPLO PARA EL CALENDARIO ---
const mockEvents = [
  { id: 1, name: 'Torneo Nacional "Copa Bunkai"', date: '2025-10-25', type: 'Torneo' },
  { id: 2, name: 'Examen de Grado Cintas Negras', date: '2025-11-15', type: 'Examen' },
];

function ProfesorDashboardPage() {
  const [activeView, setActiveView] = useState('listaAlumnos');

  const renderActiveView = () => {
    switch (activeView) {
      case 'listaAlumnos':
        return <ListaAlumnos />;
      case 'misEstadisticas':
        return <EstadisticasView estadisticas={mockProfesorLogueado.estadisticas} />;
      case 'calendario':
        return <CalendarioEventosView events={mockEvents} />;
      case 'comunicados':
        return <ComunicadosView />;
      case 'renade':
        return <RenadeSection />;
      default:
        return <ListaAlumnos />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Panel de Profesor</h2>
        <div className="dashboard-layout">
          <ProfesorSidebar 
            profesor={mockProfesorLogueado} 
            activeView={activeView} 
            onSelectView={setActiveView} 
          />
          <main className="dashboard-main-content">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfesorDashboardPage;