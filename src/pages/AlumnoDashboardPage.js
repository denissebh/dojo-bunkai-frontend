import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import AlumnoSidebar from '../components/AlumnoSidebar';
import MiPerfilView from '../components/MiPerfilView';
import PagosView from '../components/PagosView';
import ExamenesView from '../components/ExamenesView';
import TorneosView from '../components/TorneosView';
import SeminariosView from '../components/SeminariosView';
import EditarDatosView from '../components/EditarDatosView';
import RenadeSection from '../components/RenadeSection'; 

function AlumnoDashboardPage() {
  const [activeView, setActiveView] = useState('miPerfil'); 
  const [alumnoData, setAlumnoData] = useState(null); 
  const navigate = useNavigate();

  // --- FUNCIÓN PARA OBTENER EL PERFIL COMPLETO DEL ALUMNO DESDE LA API ---
  const fetchAlumnoProfile = async () => {
   
    const storedUserData = localStorage.getItem('userData');
    const token = localStorage.getItem('accessToken');

    if (!storedUserData || !token) { 
      alert('Error: No se encontraron datos de sesión.');
      navigate('/login'); 
      return;
    }
    const userData = JSON.parse(storedUserData);

    // Verifica si hay un ID de usuario válido
    if (!userData || !userData.id) {
        alert('Error: Datos de sesión inválidos.');
        navigate('/login');
        return;
    }

    // Llama a la API para obtener el perfil completo usando el ID
    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${userData.id}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        // Si el usuario no se encuentra en el backend (ej. fue eliminado), redirige
        if (response.status === 404) {
             alert('Tu perfil no fue encontrado.');
             navigate('/login'); // O a una página de error
             return;
        }
        // Manejar otros errores de autenticación (ej. token expirado)
        if (response.status === 401 || response.status === 403) {
            alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
            localStorage.removeItem('userData');
            localStorage.removeItem('accessToken');
            navigate('/login');
            return;
        }
        throw new Error('No se pudo cargar el perfil del alumno.');
      }
      const data = await response.json();
      setAlumnoData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert('Error al cargar tu perfil. Intenta iniciar sesión de nuevo.');
      localStorage.removeItem('userData'); 
      localStorage.removeItem('accessToken'); 
      navigate('/login'); 
    }
  };

  useEffect(() => {
    fetchAlumnoProfile();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const renderActiveView = () => {
    if (!alumnoData) return <p>Cargando datos...</p>;
    // Renderiza el componente correspondiente a la vista activa
    switch (activeView) {
      case 'miPerfil':
        return <MiPerfilView alumno={alumnoData} onEditClick={() => setActiveView('editar')} />;
      case 'pagos':
        return <PagosView payments={alumnoData.pagos || []} />;
      case 'examenes':
        return <ExamenesView examenes={alumnoData.examenes || []} />;
      case 'torneos':
        return <TorneosView torneos={alumnoData.torneos || []} />;
      case 'seminarios':
        return <SeminariosView seminarios={alumnoData.seminarios || []} />;
      case 'editar':
        return <EditarDatosView alumno={alumnoData} onProfileUpdate={fetchAlumnoProfile} changeView={setActiveView} />;
      case 'renade':
        return <RenadeSection />; 
      default:
        // Por defecto, muestra Mi Perfil
        return <MiPerfilView alumno={alumnoData} onEditClick={() => setActiveView('editar')} />;
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>Alumno</h2>
        <div className="dashboard-layout">
          {}
          <AlumnoSidebar
            alumno={alumnoData}
            activeView={activeView}
            onSelectView={setActiveView}
          />
          {/* El contenido principal renderiza la vista activa */}
          <main className="dashboard-main-content">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AlumnoDashboardPage;

