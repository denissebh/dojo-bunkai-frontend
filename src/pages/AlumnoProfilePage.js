import React, { useState, useEffect } from 'react'; // <-- Añadido useEffect

// Importa todos los componentes del panel
import AdminSidebar from '../components/AdminSidebar';
import PaymentList from '../components/PaymentList';
import EventCalendarManager from '../components/EventCalendarManager';
import CreateProfessorForm from '../components/CreateProfessorForm';
import AddTournamentResultForm from '../components/AddTournamentResultForm';
import UserManagement from '../components/UserManagement';
import RenadeValidationView from '../components/RenadeValidationView';
import AddExamResultView from '../components/AddExamResultView';
import AddSeminarView from '../components/AddSeminarView';


function AdminDashboardPage() {
  const [activeView, setActiveView] = useState('viewPayments');

  const [payments, setPayments] = useState([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);

  useEffect(() => {

    if (activeView === 'viewPayments') {
      const fetchPayments = async () => {
        setIsLoadingPayments(true);
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          alert('Error de sesión. Por favor, inicia sesión de nuevo.');
          setIsLoadingPayments(false);
          
          return;
        }

        try {
          // Usamos el endpoint '/api/pagos' de  API Gateway
          const response = await fetch('http://localhost:4000/api/pagos', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Error al cargar la lista de pagos');
          }

          const data = await response.json();
          setPayments(data); 

        } catch (error) {
          console.error("Error fetching payments:", error);
          alert('No se pudo cargar la lista de pagos.');
        } finally {
          setIsLoadingPayments(false);
        }
      };

      fetchPayments();
    }
  }, [activeView]); 


  const renderActiveView = () => {
    
    // ---  Manejo de estado de carga para Pagos ---
    if (activeView === 'viewPayments' && isLoadingPayments) {
      return <p>Cargando lista de pagos...</p>;
    }

    switch (activeView) {
      case 'viewPayments':
        return <PaymentList payments={payments} />;
      case 'manageEvents':
        return <EventCalendarManager />;
      case 'createProfessor':
        return <CreateProfessorForm />;
      case 'addTournamentResult':
        return <AddTournamentResultForm />;
      case 'addExamResult':
        return <AddExamResultView />;
      case 'addSeminarResult':
        return <AddSeminarView />;
      case 'editProfiles':
        return <UserManagement />;
      case 'validateRenade':
        return <RenadeValidationView />;
      default:
        return <PaymentList payments={payments} />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Administrador</h2>
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