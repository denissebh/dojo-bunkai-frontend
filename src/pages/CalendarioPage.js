import React, { useState, useEffect } from 'react';

function CalendarioPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // --- Carga eventos desde la API ---
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/actividades');
        if (!response.ok) throw new Error('No se pudieron cargar los eventos.');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };
    
    fetchEvents();
  }, []); 

  return (
    <div className="page-container">
      <div className="container">
        <h2>Calendario de Actividades</h2>
        <p>Próximos eventos, torneos y seminarios.</p>
        
        {loading ? (
          <p>Cargando eventos...</p>
        ) : (
          <div className="flyer-gallery">
            {events.length > 0 ? events.map(event => (
              <div key={event.id} className="flyer-item">
                <img
                  src={event.descripcion || 'https://via.placeholder.com/400x600?text=Evento'}
                  alt={`Evento: ${event.titulo}`}
                  style={{ backgroundColor: event.descripcion ? 'transparent' : '#eee' }}
                />
                <h3>{event.titulo} ({event.tipo})</h3>
                <p>Fecha: {new Date(event.fecha_inicio).toLocaleDateString()}</p>
              </div>
            )) : (
              <p>No hay eventos programados por el momento.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarioPage;