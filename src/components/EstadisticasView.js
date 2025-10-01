import React from 'react';

function EstadisticasView({ estadisticas }) {
  return (
    <div>
      <h3>Mis Estadísticas y Logros</h3>
      <ul className="info-list">
        {estadisticas && estadisticas.length > 0 ? (
          estadisticas.map((item, index) => (
            <li key={index}>
              <strong>{item.torneo}</strong>
              <span>{item.resultado}</span>
            </li>
          ))
        ) : (
          <p>No hay estadísticas personales registradas.</p>
        )}
      </ul>
    </div>
  );
}
export default EstadisticasView;