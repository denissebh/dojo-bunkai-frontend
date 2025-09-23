import React, { useState } from 'react';

import AdminSidebar from '../components/AdminSidebar';
import CreateProfessorForm from '../components/CreateProfessorForm';
import AddTournamentResultForm from '../components/AddTournamentResultForm';
import PaymentList from '../components/PaymentList';
import EventCalendarManager from '../components/EventCalendarManager';
import UserManagement from '../components/UserManagement';

const mockPayments = [
  { id: 1, studentName: 'Renata Martínez', concept: 'Mensualidad Octubre', dueDate: '10/10/2025', status: 'Pagado' },
  { id: 2, studentName: 'Damián Hernandez', concept: 'Mensualidad Octubre', dueDate: '10/10/2025', status: 'Pendiente' },
  { id: 4, studentName: 'Fernanda Herrera', concept: 'Mensualidad Septiembre', dueDate: '10/09/2025', status: 'Vencido' },
];

function AdminDashboardPage() {
  const [activeView, setActiveView] = useState('viewPayments');

  const renderActiveView = () => {
    switch (activeView) {
      case 'viewPayments':
        return <PaymentList payments={mockPayments} />;
      case 'manageEvents':
        return <EventCalendarManager />;
      case 'createProfessor':
        return <CreateProfessorForm />;
      case 'addTournamentResult':
        return <AddTournamentResultForm />;
      case 'editProfiles':
        return <UserManagement />;
      default:
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