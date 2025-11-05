import React, { useState, useEffect } from 'react';

function ComunicadosView() {
  const [comunicados, setComunicados] = useState([]);
  const [newComunicado, setNewComunicado] = useState('');


  const fetchComunicados = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/comunicados');
      if (!response.ok) throw new Error('No se pudieron cargar los comunicados.');
      const data = await response.json();
      setComunicados(data);
    } catch (error) {
      console.error('Error al cargar comunicados:', error);
    }
  };


  useEffect(() => {
    fetchComunicados();
  }, []);

 
  const handlePost = async (e) => {
    e.preventDefault();
    if (!newComunicado.trim()) return;

    // Obtenemos el ID del profesor desde localStorage
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        alert('Error: No se pudo encontrar tu sesión.');
        return;
    }
    const profesorData = JSON.parse(storedUserData);

    const dataToSend = {
      id_profesor: profesorData.id,
      mensaje: newComunicado
    };

    try {
      // Llamamos a la API para crear el comunicado
      const response = await fetch('http://localhost:4000/api/comunicados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      if (!response.ok) throw new Error('Error al publicar el comunicado.');

      alert('Comunicado publicado exitosamente.');
      setNewComunicado(''); 
      fetchComunicados(); 

    } catch (error) {
      console.error('Error al publicar:', error);
      alert('Hubo un error al publicar el comunicado.');
    }
  };

  return (
    <div>
      <h3>Comunicados</h3>
      <form onSubmit={handlePost} className="contact-form admin-form" style={{ maxWidth: '100%', marginBottom: '30px' }}>
        <textarea
          rows="3"
          placeholder="Escribe un nuevo comunicado para los alumnos..."
          value={newComunicado}
          onChange={(e) => setNewComunicado(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Publicar</button>
      </form>
      <h4 className="event-list-title">Historial de Comunicados</h4>
      <ul className="info-list">
        {comunicados.length === 0 && <p>No hay comunicados publicados.</p>}
        {comunicados.map(comunicado => (
          <li key={comunicado.id}>
            <strong>Publicado por: {comunicado.nombre_profesor}</strong>
            <span>{new Date(comunicado.fecha_publicacion).toLocaleString()}</span>
            <p style={{ marginTop: '10px' }}>{comunicado.mensaje}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ComunicadosView;