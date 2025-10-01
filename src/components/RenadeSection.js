import React, { useState } from 'react';

// Un componente simple para el icono de PDF, podrías usar una librería de iconos en el futuro
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);


function RenadeSection() {
  // Estado para guardar los archivos seleccionados
  const [curpDocument, setCurpDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  // Maneja la selección del archivo CURP
  const handleCurpChange = (e) => {
    if (e.target.files[0]) {
      setCurpDocument(e.target.files[0]);
    }
  };

  // Maneja la selección de la foto y crea una vista previa
  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curpDocument || !photo) {
      alert('Por favor, sube ambos documentos.');
      return;
    }
    // Lógica para enviar los archivos al backend
    alert(`Archivos listos para enviar: \n- CURP: ${curpDocument.name} \n- Foto: ${photo.name}`);
    console.log({ curpDocument, photo });
  };

  return (
    <div className="contact-section">
      <div className="container">
        <h2>Solicitud de RENADE</h2>
        <p>Sube tu fotografía en formato JPG y tu CURP en formato PDF para comenzar tu solicitud.</p>

        <form onSubmit={handleSubmit} className="renade-form">
          <div className="file-upload-container">
            {/* Caja para subir la fotografía */}
            <label htmlFor="photo-upload" className="file-upload-box">
              <h3>Sube tu Fotografía</h3>
              {photoPreview ? (
                <img src={photoPreview} alt="Vista previa" className="photo-preview" />
              ) : (
                <UserIcon />
              )}
              <span>{photo ? photo.name : 'Haz clic para seleccionar (JPG)'}</span>
            </label>
            <input id="photo-upload" type="file" accept=".jpg, .jpeg" onChange={handlePhotoChange} />

            {/* Caja para subir el CURP */}
            <label htmlFor="curp-upload" className="file-upload-box">
              <h3>Sube tu CURP</h3>
              <PdfIcon />
              <span>{curpDocument ? curpDocument.name : 'Haz clic para seleccionar (PDF)'}</span>
            </label>
            <input id="curp-upload" type="file" accept=".pdf" onChange={handleCurpChange} />
          </div>

          <button type="submit" className="btn btn-primary">Enviar Solicitud</button>
        </form>
      </div>
    </div>
  );
}

export default RenadeSection;