import React, { useState } from 'react';

// (Puedes mantener tus componentes de Icono SVG aquí si los tienes)
const PdfIcon = () => ( <svg>...</svg> );
const UserIcon = () => ( <svg>...</svg> );

function RenadeSection() {
  const [curpDocument, setCurpDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const handleCurpChange = (e) => {
    if (e.target.files[0]) {
      setCurpDocument(e.target.files[0]);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curpDocument || !photo) {
      alert('Por favor, sube ambos documentos.');
      return;
    }

    // --- CAMBIO: Obtener el ID del usuario real desde localStorage ---
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        alert('Error: No se pudo encontrar tu sesión. Por favor, inicia sesión de nuevo.');
        return;
    }
    const userData = JSON.parse(storedUserData);
    if (!userData || !userData.id) {
        alert('Error: Datos de sesión inválidos.');
        return;
    }
    // --- FIN DEL CAMBIO ---

    const formData = new FormData();
    formData.append('id_usuario', userData.id); // <-- Usa el ID real
    formData.append('foto', photo);
    formData.append('curp', curpDocument);

    try {
      const response = await fetch('http://localhost:4000/api/documentos/renade', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud.');
      }

      const data = await response.json();
      console.log('Solicitud enviada:', data);
      alert('Tu solicitud de RENADE ha sido enviada para validación.');
      
   
      setCurpDocument(null);
      setPhoto(null);
      setPhotoPreview('');

    } catch (error) {
      console.error('Error en la solicitud de RENADE:', error);
      alert('Hubo un error al enviar tu solicitud.');
    }
  };

  return (
    <div>
      <h3>Solicitud de RENADE</h3>
      <p>Sube tu fotografía en formato JPG y tu CURP en formato PDF para comenzar tu solicitud.</p>
      <form onSubmit={handleSubmit} className="renade-form">
        <div className="file-upload-container">
          <label htmlFor="photo-upload" className="file-upload-box">
            <h3>Sube tu Fotografía</h3>
            {photoPreview ? (
              <img src={photoPreview} alt="Vista previa" className="photo-preview" />
            ) : ( <UserIcon /> )}
            <span>{photo ? photo.name : 'Haz clic para seleccionar (JPG)'}</span>
          </label>
          <input id="photo-upload" type="file" accept=".jpg, .jpeg" onChange={handlePhotoChange} />

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
  );
}
export default RenadeSection;