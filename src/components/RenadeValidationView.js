import React from 'react';
// Datos de ejemplo
const pendingRenades = [
    { id: 1, studentName: 'Damián Hernandez', date: '2025-10-05'},
    { id: 2, studentName: 'Daniel Trujillo', date: '2025-10-04'},
];

function RenadeValidationView() {
  return (
    <div>
      <h3>Solicitudes de RENADE Pendientes</h3>
      <ul className="info-list">
        {pendingRenades.map(req => (
          <li key={req.id} className='user-list-item'>
            <div className="user-info">
              <strong>{req.studentName}</strong>
              <span>Enviado: {req.date}</span>
            </div>
            <div className="user-actions">
              <button className="asistencia-btn presente">Aprobar</button>
              <button className="asistencia-btn falta">Rechazar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RenadeValidationView;