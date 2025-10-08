import React, { useState } from 'react';

// Importa todos los componentes del panel
import AdminSidebar from '../components/AdminSidebar';
import PaymentList from '../components/PaymentList';
import EventCalendarManager from '../components/EventCalendarManager';
import CreateProfessorForm from '../components/CreateProfessorForm';
import AddTournamentResultForm from '../components/AddTournamentResultForm';
import UserManagement from '../components/UserManagement';
import RenadeValidationView from '../components/RenadeValidationView';
import PaymentValidationView from '../components/PaymentValidationView';

// --- AÑADIR DE NUEVO LOS DATOS DE EJEMPLO ---
const mockPayments = [
    { id: 1, studentName: 'Renata Martínez', concept: 'Mensualidad', dueDate: '2025-10-10', status: 'Pagado' },
    { id: 2, studentName: 'Damián Hernandez', concept: 'Mensualidad', dueDate: '2025-10-10', status: 'Pendiente' },
    { id: 3, studentName: 'Fernanda Herrera', concept: 'Mensualidad', dueDate: '2025-09-10', status: 'Vencido' },
];

function AdminDashboardPage() {
  const [activeView, setActiveView] = useState('viewPayments');

  const renderActiveView = () => {
    switch (activeView) {
      case 'viewPayments':
        // --- PASAR LOS DATOS COMO PROP ---
        return <PaymentList payments={mockPayments} />;
      case 'manageEvents':
        return <EventCalendarManager />;
      case 'createProfessor':
        return <CreateProfessorForm />;
      case 'addTournamentResult':
        return <AddTournamentResultForm />;
      case 'editProfiles':
        return <UserManagement />;
      case 'validateRenade':
        return <RenadeValidationView />;
      case 'validatePayments':
        return <PaymentValidationView />;
      default:
        // --- PASAR LOS DATOS COMO PROP ---
        return <PaymentList payments={mockPayments} />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Panel de Administrador</h2>
        <div className="dashboard-layout">
          <AdminSidebar activeView={activeView} onSelectView={setActiveView} />
          <main className="dashboard-main-content">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;