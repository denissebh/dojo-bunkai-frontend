import React, { useState, useEffect } from 'react'; // <-- Importa useEffect

function EventCalendarManager() {
  const [events, setEvents] = useState([]); 
  const [newEvent, setNewEvent] = useState({ name: '', date: '', type: 'Torneo', imageUrl: null });

  // ---Cargar eventos desde la API ---
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/actividades');
      if (!response.ok) throw new Error('No se pudieron cargar los eventos.');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent(prevState => ({
          ...prevState,
          imageUrl: reader.result 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEvent.name.trim() || !newEvent.date) return;
    
    
    const eventToAdd = {
      name: newEvent.name,
      date: newEvent.date,
      type: newEvent.type,
      imageUrl: newEvent.imageUrl 
    };

    try {
      // Llamamos al endpoint POST de la API
      const response = await fetch('http://localhost:4000/api/actividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventToAdd)
      });
      if (!response.ok) throw new Error('Error al crear el evento.');

      alert('Evento creado exitosamente.');
      setNewEvent({ name: '', date: '', type: 'Torneo', imageUrl: null }); 
      fetchEvents(); 

    } catch (error) {
      console.error('Error al crear evento:', error);
      alert('Hubo un error al crear el evento.');
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      return;
    }
    
    try {
      // Llamamos al endpoint DELETE de la API
      const response = await fetch(`http://localhost:4000/api/actividades/${eventId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar el evento.');

      alert('Evento eliminado.');
      fetchEvents(); // Recargamos la lista

    } catch (error) {
      console.error('Error al eliminar evento:', error);
      alert('Hubo un error al eliminar el evento.');
    }
  };

  return (
    <div>
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
        <div className="form-row file-input-row">
           <label htmlFor="event-image-upload" className="file-input-label">
             Seleccionar Imagen (Opcional)
           </label>
           <input
             id="event-image-upload"
             type="file"
             accept="image/*"
             onChange={handleImageChange}
           />
           {newEvent.imageUrl && <img src={newEvent.imageUrl} alt="Vista previa" className="image-preview" />}
        </div>
        <button type="submit" className="btn btn-primary">Agregar Evento</button>
      </form>

  
      <h4 className="event-list-title">Eventos Programados</h4>
      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <div className="event-info">
              {event.descripcion && <img src={event.descripcion} alt="" className="event-list-image-preview"/>}
              <div>
                <strong>{event.titulo}</strong> ({event.tipo}) {/* Usamos 'titulo' y 'tipo' de la BD */}
                <span>Fecha: {new Date(event.fecha_inicio).toLocaleDateString()}</span> {/* Usamos 'fecha_inicio' */}
              </div>
            </div>
            <button onClick={() => handleDelete(event.id)} className="delete-btn">
              Eliminar
            </button>
          </li>
        ))}
        {events.length === 0 && <p>No hay eventos programados.</p>}
      </ul>
    </div>
  );
}

export default EventCalendarManager;