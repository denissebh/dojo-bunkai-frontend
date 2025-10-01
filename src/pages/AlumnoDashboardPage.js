import React, { useState } from 'react';
import AlumnoSidebar from '../components/AlumnoSidebar';
import RenadeSection from '../components/RenadeSection';
import PagosView from '../components/PagosView';
import ExamenesView from '../components/ExamenesView';
import TorneosView from '../components/TorneosView';
import SeminariosView from '../components/SeminariosView';
import EditarDatosView from '../components/EditarDatosView';

// (Aquí va la variable mockAlumnoLogueado que actualizaste en el Paso 1)
const mockAlumnoLogueado = {
  id: 1,
  nombre: 'Renata Martínez Sánchez',
  grado: 'Alumna 4to Kyu',
  email: 'renata@email.com',
  telefono: '55-1111-2222',
  pagos: [{ id: 101, mes: 'Junio', concepto: 'Mensualidad Junio 2025', fechaPago: '5 de junio 2025', fechaMaxima: '10 de junio 2025', metodo: 'Efectivo', estatus: 'Pagado' }],
  examenes: [{ id: 1, fecha: '2025-08-15', gradoAlcanzado: '4to Kyu', resultado: 'Aprobado' }, { id: 2, fecha: '2025-02-10', gradoAlcanzado: '5to Kyu', resultado: 'Aprobado' }],
  torneos: [{ id: 1, nombre: 'Copa Bunkai 2025', lugar: '1er Lugar Kata' }, { id: 2, nombre: 'Torneo Kyodai 2024', lugar: '3er Lugar Kumite' }],
  seminarios: [{ id: 1, nombre: 'Seminario de Defensa Personal', fecha: '2025-07-20', ponente: 'Sensei invitado' }]
};

function AlumnoDashboardPage() {
  const [activeView, setActiveView] = useState('pagos');

  const renderActiveView = () => {
    switch (activeView) {
      case 'pagos':
        return <PagosView payments={mockAlumnoLogueado.pagos} />;
      case 'renade':
        return <RenadeSection />;
      case 'examenes':
        return <ExamenesView examenes={mockAlumnoLogueado.examenes} />;
      case 'torneos':
        return <TorneosView torneos={mockAlumnoLogueado.torneos} />;
      case 'seminarios':
        return <SeminariosView seminarios={mockAlumnoLogueado.seminarios} />;
      case 'editar':
        return <EditarDatosView alumno={mockAlumnoLogueado} />;
      default:
        return <PagosView payments={mockAlumnoLogueado.pagos} />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Panel de Alumno</h2>
        <div className="dashboard-layout">
          <AlumnoSidebar 
            alumno={mockAlumnoLogueado} 
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
export default AlumnoDashboardPage;