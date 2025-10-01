import React from 'react';

function ExamenesView({ examenes }) {
  return (
    <div>
      <h3>Historial de Exámenes</h3>
      <ul className="info-list">
        {examenes.length > 0 ? (
          examenes.map(examen => (
            <li key={examen.id}>
              <strong>Fecha: {examen.fecha}</strong>
              <span>Grado Alcanzado: {examen.gradoAlcanzado}</span>
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