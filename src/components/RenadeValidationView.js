import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function RenadeValidationView() {
  const [pendingRenades, setPendingRenades] = useState([]);
  const navigate = useNavigate(); // --- NUEVO


  const handleAuthError = (error) => {
    console.error("Error de autenticación:", error);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  // Función para cargar las solicitudes pendientes
  const fetchPendingRenades = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return handleAuthError('No se encontró token');
    }
 

    try {
      const response = await fetch('http://localhost:4000/api/documentos/renade/pendientes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return handleAuthError('Token inválido');
        }
        throw new Error('No se pudo cargar la lista.');
      }
      const data = await response.json();
      setPendingRenades(data);
    } catch (error) {
      console.error("Error fetching pending RENADE:", error);
      if (error.message.includes('Token inválido')) return;
      alert('Error al cargar solicitudes pendientes.');
    }
  };

  useEffect(() => {
    fetchPendingRenades();

  }, []);

  // Función para aprobar o rechazar
  const handleValidation = async (requestId, nuevoEstado) => {
    let motivoRechazo = '';
    if (nuevoEstado === 'Rechazado') {
      motivoRechazo = prompt('Por favor, ingresa el motivo del rechazo:');
      if (motivoRechazo === null || motivoRechazo.trim() === '') {
        alert('Se requiere un motivo para rechazar.');
        return; 
      }
    }
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return handleAuthError('No se encontró token');
    }

    try {
      const response = await fetch(`http://localhost:4000/api/documentos/renade/${requestId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nuevoEstado, motivoRechazo })
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return handleAuthError('Token inválido');
        }
        throw new Error(`Error al ${nuevoEstado === 'Validado' ? 'aprobar' : 'rechazar'}.`);
      }

      alert(`Solicitud ${nuevoEstado.toLowerCase()}a exitosamente.`);
      fetchPendingRenades();

    } catch (error) {
      console.error("Error validating RENADE:", error);
      alert(`Hubo un error al ${nuevoEstado === 'Validado' ? 'aprobar' : 'rechazar'} la solicitud.`);
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
