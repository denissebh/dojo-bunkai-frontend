import React from 'react';

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