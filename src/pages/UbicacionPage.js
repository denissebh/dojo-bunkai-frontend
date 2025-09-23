import React from 'react';

function UbicacionPage() {
  const direccion = "Ejido Diez S/N, esq. Margaritas, Col. Ampliacion del Carmen, CP 55025, Ecatepec de Morelos, Estado de México.";

  return (
    <div className="page-container">
      <div className="container">
        <h2>Nuestra Ubicación</h2>
        <p>Encuéntranos en la siguiente dirección:</p>
        <p className="address-text">{direccion}</p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.336952702214!2d-99.0528896845347!3d19.6121709867828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f113a80a2219%3A0x6b1f2e8f5b403471!2sDojo%20Bunkai%20Shudokan!5e0!3m2!1ses-419!2smx!4v1663458123456"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Dojo Bunkai"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default UbicacionPage;