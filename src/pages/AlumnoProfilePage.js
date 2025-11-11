import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api'; 

function AlumnoProfilePage() {
  const { alumnoId } = useParams();
  const navigate = useNavigate(); // 4. Preparamos useNavigate

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  const handleGoBack = () => {
    navigate('/profesor/dashboard'); 
  };

  useEffect(() => {
    const fetchAlumnoProfile = async () => {
      setIsLoading(true);
      setError(null);      
      try {
        const data = await api.get(`/usuarios/${alumnoId}/profile`);
        setProfile(data); // Guardamos el objeto completo

      } catch (err) {
        console.error("Error al buscar el perfil del alumno:", err);
        if (err instanceof AuthError) {
          handleAuthError(err.message);
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumnoProfile();
    
  }, [alumnoId, handleAuthError]); 

  if (isLoading) {
    return <div className="container"><p>Cargando perfil del alumno...</p></div>;
  }

  if (error) {
    return (
      <div className="container error-message">
        <p>Error: {error}</p>
        <button onClick={handleGoBack} className="btn btn-secondary" style={{ marginTop: '20px' }}>
          &larr; Regresar
        </button>
      </div>
    );
  }

  if (!profile) {
    return <div className="container"><p>No se encontró el alumno.</p></div>;
  }


  return (
    <div className="container">
      <button 
        onClick={handleGoBack} 
        className="btn btn-secondary" 
        style={{ marginBottom: '20px', alignSelf: 'flex-start' }}
      >
        &larr; Regresar a la Lista de Alumnos
      </button>

      <h2>Perfil de {profile.nombre} {profile.apellido_paterno}</h2>
      <div className="profile-card">
        <h3>Información Principal</h3>
        <p><strong>ID Alumno:</strong> {profile.id}</p> 
        <p><strong>Email:</strong> {profile.correo_electronico}</p>
        <p><strong>Grado (Cinturón):</strong> {profile.grado || 'N/A'}</p>
        <p><strong>Teléfono:</strong> {profile.telefono || 'N/A'}</p>
        <p><strong>CURP:</strong> {profile.curp || 'N/A'}</p>
        <p><strong>Alergias:</strong> {profile.alergias || 'Ninguna'}</p>
      </div>

      <div className="profile-section">
        <h3>Historial de Pagos</h3>
        {profile.pagos && profile.pagos.length > 0 ? (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Tipo de Pago</th>
                <th>Fecha de Vencimiento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {profile.pagos.map((pago) => (
                <tr key={pago.id}> 
                  <td>{pago.concepto}</td>
                  <td>${pago.monto || 'N/A'}</td> {/* ⚠️ ¡Ver nota abajo! */}
                  <td>{pago.tipo_pago}</td>
                  <td>{new Date(pago.fecha_vencimiento).toLocaleDateString()}</td>
                  <td>{pago.estatus_pago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Este alumno no tiene pagos registrados.</p>
        )}
      </div>
      
      {/* Sección de Exámenes (sin cambios) */}
      <div className="profile-section">
        <h3>Exámenes de Grado</h3>
        {profile.examenes && profile.examenes.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Grado Alcanzado (Descripción)</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {profile.examenes.map((ex) => (
                <tr key={ex.id}>
                  <td>{new Date(ex.fecha).toLocaleDateString()}</td>
                  <td>{ex.descripcion}</td>
                  <td>{ex.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay exámenes registrados.</p>
        )}
      </div>

      {/* Sección de Torneos (sin cambios) */}
      <div className="profile-section">
        <h3>Torneos</h3>
        {profile.torneos && profile.torneos.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre (Descripción)</th>
                <th>Categoría</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {profile.torneos.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.fecha).toLocaleDateString()}</td>
                  <td>{t.descripcion}</td>
                  <td>{t.categoria}</td>
                  <td>{t.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay torneos registrados.</p>
        )}
      </div>

    </div>
  );
}

export default AlumnoProfilePage;