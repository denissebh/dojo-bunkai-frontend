import React from 'react';

const mockComunicados = [
    {id: 1, date: '2025-09-29', message: 'Recordatorio: La clase del viernes se enfocará en técnicas de kumite. No olviden traer su equipo completo.'},
    {id: 2, date: '2025-09-25', message: 'Las inscripciones para el Torneo de Aniversario ya están abiertas. Consultar con el administrador.'}
];

function ComunicadosView() {
  return (
    <div>
      <h3>Comunicados</h3>
      <ul className="info-list">
        {mockComunicados.map(comunicado => (
          <li key={comunicado.id}>
            <strong>Fecha: {comunicado.date}</strong>
            <span>{comunicado.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ComunicadosView;