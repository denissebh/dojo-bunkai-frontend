import React from 'react';

// URL de los flyers de ejemplo que encontré. Reemplázalos con los tuyos.
const flyer1 = 'http://googleusercontent.com/image_collection/image_retrieval/3951053924918347852_0';
const flyer2 = 'http://googleusercontent.com/image_collection/image_retrieval/3951053924918347852_1';


function CalendarioPage() {
  return (
    <div className="page-container">
      <div className="container">
        <h2>Calendario de Actividades</h2>
        <p>Consulta los próximos eventos, torneos y seminarios del mes.</p>
        <div className="flyer-gallery">
          <div className="flyer-item">
            <img src={flyer1} alt="Flyer de Torneo de Karate" />
            <h3>Torneo Copa Bunkai - Octubre</h3>
          </div>
          <div className="flyer-item">
            <img src={flyer2} alt="Flyer de Seminario de Kata" />
            <h3>Seminario de Kata - Noviembre</h3>
          </div>
          {/* Puedes agregar más flyers aquí */}
        </div>
      </div>
    </div>
  );
}

export default CalendarioPage;