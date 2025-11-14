import React from 'react';

function SeminariosView({ seminarios }) {
  return (
    <div>
      <h3>Seminarios Asistidos</h3>
      <div className="dashboard-cards-container">
        {seminarios.length > 0 ? (
          seminarios.map((seminario) => (
            <div key={seminario.id} className="dashboard-card">
              <h4>{seminario.descripcion}</h4>
              <p className="text-muted">{new Date(seminario.fecha).toLocaleDateString()}</p>
              <p><strong>Ponente:</strong> {seminario.ponente || 'No especificado'}</p>
            </div>
          ))
        ) : (
          <p>No hay seminarios registrados.</p>
        )}
      </div>
    </div>
  );
}

export default SeminariosView;