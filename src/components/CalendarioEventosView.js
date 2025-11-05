import React from 'react';
const initialEvents = JSON.parse(localStorage.getItem('dojoEvents')) || [
  { id: 1, name: 'Torneo Nacional "Copa Bunkai"', date: '2025-10-25', type: 'Torneo' },

];

function CalendarioEventosView({ events }) {
  return (
    <div>
      <h3>Próximos Eventos del Dojo</h3>
      <ul className="info-list">
        {events && events.length > 0 ? (
          events.map(event => (
            <li key={event.id}>
              <strong>{event.name} ({event.type})</strong>
              <span>Fecha: {event.date}</span>
            </li>
          ))
        ) : (
          <p>No hay eventos programados.</p>
        )}
      </ul>
    </div>
  );
}
export default CalendarioEventosView;