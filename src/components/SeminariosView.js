import React from 'react';

function SeminariosView({ seminarios }) {
  return (
    <div>
      <h3>Seminarios Asistidos</h3>
      <ul className="info-list">
        {seminarios.length > 0 ? (
          seminarios.map(seminario => (
            <li key={seminario.id}>
              <strong>{seminario.nombre} ({seminario.fecha})</strong>
              <span>Ponente: {seminario.ponente}</span>
            </li>
          ))
        ) : (
          <p>No hay seminarios registrados.</p>
        )}
      </ul>
    </div>
  );
}
export default SeminariosView;