import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api';

// (Puedes mantener tus componentes de Icono SVG aquí si los tienes)
const PdfIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M..."></path></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M..."></path></svg> );

function RenadeSection() {
  // Esta fue la línea que corregimos del typo
  const [curpDocument, setCurpDocument] = useState(null); 
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const navigate = useNavigate(); 

  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

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

    const formData = new FormData();
    // Ya no es necesario adjuntar 'id_usuario'. 
    // El backend sabrá quién eres gracias al Token JWT.
    formData.append('foto', photo);
    formData.append('curp', curpDocument);

    try {
      // ESTA ES LA LÍNEA CLAVE:
      // Usamos api.post, que SÍ envía el token
      const data = await api.post('/documentos/renade', formData);

      console.log('Solicitud enviada:', data);
      alert('Tu solicitud de RENADE ha sido enviada para validación.');
      
      setCurpDocument(null);
      setPhoto(null);
      setPhotoPreview('');

    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error en la solicitud de RENADE:', error);
        alert(`Hubo un error al enviar tu solicitud: ${error.message}`);
      }
    }
  };

  // --- El JSX de 'return' no cambia ---
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