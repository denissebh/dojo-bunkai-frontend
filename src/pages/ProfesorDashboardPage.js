import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfesorSidebar from '../components/ProfesorSidebar';
import ListaAlumnos from '../components/ListaAlumnos';
import RenadeSection from '../components/RenadeSection';
import EstadisticasView from '../components/EstadisticasView';
import CalendarioEventosView from '../components/CalendarioEventosView';
import ComunicadosView from '../components/ComunicadosView';

// Importa una imagen por defecto
import fotoProfesorDefault from '../assets/images/profesor.webp';

function ProfesorDashboardPage() {
  const [activeView, setActiveView] = useState('listaAlumnos');
  const [profesorData, setProfesorData] = useState(null); 
  const navigate = useNavigate();

  // --- Función para manejar errores de autenticación ---
  const handleAuthError = (error) => {
    console.error("Error de autenticación:", error);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const storedUserData = localStorage.getItem('userData');
    const token = localStorage.getItem('accessToken'); // Obtener token
    
    if (!storedUserData || !token) { // Verificar también el token
      alert('No has iniciado sesión.');
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUserData);

    // Llamar a la API para obtener el perfil completo
    const fetchProfesorProfile = async () => {
      // Verificamos si hay un ID válido
      if (!userData || !userData.id) {
          alert('Error: Datos de sesión inválidos.');
          navigate('/login');
          return;
      }
      try {
        const response = await fetch(`http://localhost:4000/api/usuarios/${userData.id}/profile`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        

        if (!response.ok) {
          // --- Manejo de error de token ---
          if (response.status === 401 || response.status === 403) {
            return handleAuthError('Token inválido');
          }
          throw new Error('No se pudo cargar el perfil del profesor.');
        }
        const data = await response.json();
        
        data.foto = fotoProfesorDefault; // O data.foto = data.url_foto si lo guardas en BD
        
        setProfesorData(data); 
      } catch (error) {
        console.error("Error fetching professor profile:", error);
        if (error.message.includes('Token inválido')) return;
        alert('Error al cargar tu perfil.');
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    };

    fetchProfesorProfile();
  }, []); 

  const renderActiveView = () => {
    if (!profesorData) {
      return <p>Cargando datos...</p>;
    }

    switch (activeView) {
      case 'listaAlumnos':
        return <ListaAlumnos />; 
      case 'misEstadisticas':
        return <EstadisticasView estadisticas={profesorData.torneos || []} />; 
    
      case 'calendario':
        const allEvents = [
          ...(profesorData.examenes || []),
          ...(profesorData.torneos || []),
          ...(profesorData.seminarios || [])
        ];
       return <CalendarioEventosView events={allEvents} />;
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
        <h2>Profesor</h2>
        <div className="dashboard-layout">
          {}
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
