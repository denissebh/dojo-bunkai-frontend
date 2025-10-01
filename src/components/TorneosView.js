import React from 'react';

function TorneosView({ torneos }) {
  return (
    <div>
      <h3>Resultados de Torneos</h3>
      <ul className="info-list">
        {torneos.length > 0 ? (
          torneos.map(torneo => (
            <li key={torneo.id}>
              <strong>{torneo.nombre}</strong>
              <span>Lugar: {torneo.lugar}</span>
              <span>Categoría: {torneo.categoria}</span> 
            </li>
          ))
        ) : (
          <p>No hay resultados de torneos.</p>
        )}
      </ul>
    </div>
  );
}
export default TorneosView;