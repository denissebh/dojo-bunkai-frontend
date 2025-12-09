import React from 'react';

function EstadisticasView({ estadisticas }) {
  return (
    <div>
      <h3>Mis Estadísticas y Logros</h3>
      <ul className="info-list">
        {estadisticas && estadisticas.length > 0 ? (
          estadisticas.map((item, index) => (
            <li key={index}>
              {/* 1. Mostramos el Tipo y el Nombre (Descripción) */}
              <strong>{item.tipo_evento}: {item.descripcion}</strong>
              
              {/* 2. Mostramos la Fecha y el Resultado */}
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                <span>{new Date(item.fecha).toLocaleDateString()}</span>
                {' - '}
                <span style={{ fontWeight: 'bold', color: '#D32F2F' }}>
                  {item.resultado || 'Asistencia'}
                </span>
              </div>
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