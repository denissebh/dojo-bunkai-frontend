import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api';

import ProfesorSidebar from '../components/ProfesorSidebar';
import ListaAlumnos from '../components/ListaAlumnos';
import RenadeSection from '../components/RenadeSection';
import EstadisticasView from '../components/EstadisticasView';
import CalendarioEventosView from '../components/CalendarioEventosView';
import ComunicadosView from '../components/ComunicadosView';

import MiPerfilView from '../components/MiPerfilView';
import EditarDatosView from '../components/EditarDatosView';
import fotoProfesorDefault from '../assets/images/profesor.webp';

function ProfesorDashboardPage() {
  const [activeView, setActiveView] = useState('listaAlumnos'); 
  const [profesorData, setProfesorData] = useState(null); 
  const navigate = useNavigate();

  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);


  useEffect(() => {
    const fetchProfesorProfile = async () => {
      const storedUserData = localStorage.getItem('userData');
      
      if (!storedUserData) {
        alert('No has iniciado sesión.');
        navigate('/login');
        return;
      }
      
      const userData = JSON.parse(storedUserData);
      if (!userData || !userData.id) {
          alert('Error: Datos de sesión inválidos.');
          navigate('/login');
          return;
      }

      try {
       
        const data = await api.get(`/usuarios/${userData.id}/profile`);
        
        data.foto = fotoProfesorDefault; // 
        
        setProfesorData(data); 

      } catch (error) {
        if (error instanceof AuthError) {
          handleAuthError(error.message);
        } else {
          console.error("Error fetching professor profile:", error);
          alert('Error al cargar tu perfil.');
          
        }
      }
    };

    fetchProfesorProfile();
  }, [navigate, handleAuthError]); 

  const renderActiveView = () => {
    if (!profesorData) {
      return <p>Cargando datos...</p>;
    }

    switch (activeView) {
      case 'miPerfil':
        return <MiPerfilView alumno={profesorData} onEditClick={() => setActiveView('editar')} />;
      case 'editar':
        return <EditarDatosView alumno={profesorData} changeView={setActiveView} />;
      case 'listaAlumnos':
        return <ListaAlumnos />; 
        case 'misEstadisticas':
          const todasLasEstadisticas = [
            ...(profesorData.torneos || []),
            ...(profesorData.examenes || []),
            ...(profesorData.seminarios || [])
          ];
          //Ordenamos por fecha (del más reciente al más antiguo) 
          todasLasEstadisticas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
          return <EstadisticasView estadisticas={todasLasEstadisticas} />;
      case 'comunicados':
        return <ComunicadosView />; 
      case 'renade':
        return <RenadeSection />; 
      default:
        return <MiPerfilView alumno={profesorData} onEditClick={() => setActiveView('editar')} />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Profesor</h2>
        <div className="dashboard-layout">
          <ProfesorSidebar 
            profesor={profesorData} 
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