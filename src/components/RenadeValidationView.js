import React, { useState, useEffect, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api'; 

function RenadeValidationView() {
  const [pendingRenades, setPendingRenades] = useState([]);
  const navigate = useNavigate();

  // 3. Envolvemos handleAuthError en useCallback
  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]); 

  const fetchPendingRenades = useCallback(async () => {
  
    try {
      const data = await api.get('/documentos/renade/pendientes');
      setPendingRenades(data);
    } catch (error) {
      
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error("Error fetching pending RENADE:", error);
        alert(`Error al cargar solicitudes pendientes: ${error.message}`);
      }
    }
  }, [handleAuthError]);
  useEffect(() => {
    fetchPendingRenades();
  }, [fetchPendingRenades]); 

  // handleValidation
  const handleValidation = async (requestId, nuevoEstado) => {
    let motivoRechazo = '';
    if (nuevoEstado === 'Rechazado') {
      motivoRechazo = prompt('Por favor, ingresa el motivo del rechazo:');
      if (motivoRechazo === null || motivoRechazo.trim() === '') {
        alert('Se requiere un motivo para rechazar.');
        return; 
      }
    }


    try {
      await api.put(`/documentos/renade/${requestId}`, { 
        nuevoEstado, 
        motivoRechazo 
      });

      alert(`Solicitud ${nuevoEstado.toLowerCase()}a exitosamente.`);
      fetchPendingRenades(); // Recargamos la lista

    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error("Error validating RENADE:", error);
        alert(`Hubo un error al ${nuevoEstado === 'Validado' ? 'aprobar' : 'rechazar'} la solicitud: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h3>Solicitudes de RENADE Pendientes</h3>
      {pendingRenades.length === 0 ? (
        <p>No hay solicitudes pendientes de validación.</p>
      ) : (
        <ul className="info-list">
          {pendingRenades.map(req => (
            <li key={req.id} className='user-list-item'>
              <div className="user-info">
                <strong>{req.studentname} (ID: {req.userid})</strong>
                <span>Enviado: {new Date(req.fecha_subida).toLocaleDateString()}</span>
                <div>
                  <a href={req.url_foto} target="_blank" rel="noopener noreferrer" className="doc-link">Ver Foto</a>
                  {' | '}
                  <a href={req.url_curp} target="_blank" rel="noopener noreferrer" className="doc-link">Ver CURP</a>
                </div>
              </div>
              <div className="user-actions">
                <button onClick={() => handleValidation(req.id, 'Validado')} className="asistencia-btn presente">Aprobar</button>
                <button onClick={() => handleValidation(req.id, 'Rechazado')} className="asistencia-btn falta">Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default RenadeValidationView;