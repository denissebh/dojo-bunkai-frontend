import React, { useState } from 'react';

const initialEvents = [
  { id: 1, name: 'Torneo Nacional "Copa Bunkai"', date: '2025-10-25', type: 'Torneo' },
  { id: 2, name: 'Examen de Grado Cintas Negras', date: '2025-11-15', type: 'Examen' },
  { id: 3, name: 'Seminario de Kumite con Sensei invitado', date: '2025-11-29', type: 'Seminario' },
];

function EventCalendarManager() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', type: 'Torneo' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.date) return;
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ name: '', date: '', type: 'Torneo' });
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div>
      <h3>Modificar Calendario de Eventos</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <input type="text" name="name" placeholder="Nombre del Evento" value={newEvent.name} onChange={handleChange} required />
        <div className="form-row">
          <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />
          <select name="type" value={newEvent.type} onChange={handleChange}>
            <option value="Torneo">Torneo</option>
            <option value="Seminario">Seminario</option>
            <option value="Examen">Examen de Grado</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Agregar Evento</button>
      </form>

      <h4 className="event-list-title">Eventos Programados</h4>
      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <div className="event-info">
              <strong>{event.name}</strong> ({event.type})
              <span>Fecha: {event.date}</span>
            </div>
            <button onClick={() => handleDelete(event.id)} className="delete-btn">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventCalendarManager;