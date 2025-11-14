import React from 'react';

function ExamenesView({ examenes }) {
  return (
    <div>
      <h3>Historial de Exámenes</h3>
      <ul className="info-list">
        {examenes.length > 0 ? (
          examenes.map(examen => (
            <li key={examen.id}>
           <h4>Fecha: {new Date(examen.fecha).toLocaleDateString()}</h4>
              <span>Grado Alcanzado: {examen.descripcion}</span>
              <span>Resultado: {examen.resultado}</span>
            </li>
          ))
        ) : (
          <p>No hay historial de exámenes.</p>
        )}
      </ul>
    </div>
  );
}
export default ExamenesView;