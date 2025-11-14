import React from 'react';

function TorneosView({ torneos }) {
  return (
    <div>
      <h3>Resultados de Torneos</h3>
      <div className="dashboard-cards-container">
        {torneos.length > 0 ? (
          torneos.map((torneo) => (
            <div key={torneo.id} className="dashboard-card">
              <h4>{torneo.descripcion}</h4>
              <p className="text-muted">{new Date(torneo.fecha).toLocaleDateString()}</p>
              
              <div className="torneo-details" style={{ marginTop: '10px' }}>
                <p><strong>Categoría:</strong> {torneo.categoria}</p>
                <p><strong>Resultado:</strong> {torneo.resultado || 'Participación'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay torneos registrados.</p>
        )}
      </div>
    </div>
  );
}

export default TorneosView;