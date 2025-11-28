import React, { useState, useEffect, useCallback } from 'react';
import { api, AuthError } from '../services/api';
import { useNavigate } from 'react-router-dom';

// --- ICONOS (SVG) ---
const PdfIcon = ({ filled }) => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill={filled ? "#ffebee" : "none"} stroke="#D32F2F" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const PhotoIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const StatusIcon = ({ status }) => {
    if (status === 'Validado') return <span style={{fontSize:'40px'}}>✅</span>;
    if (status === 'Pendiente') return <span style={{fontSize:'40px'}}>⏳</span>;
    if (status === 'Rechazado') return <span style={{fontSize:'40px'}}>❌</span>;
    return null;
};

const AlertIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> );


function RenadeSection() {
  const [status, setStatus] = useState('loading'); 
  const [motivo, setMotivo] = useState('');
  const [curpDocument, setCurpDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  
  const navigate = useNavigate();

  const handleAuthError = useCallback((errorMsg) => {
    alert('Sesión expirada.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await api.get('/documentos/renade/mis-documentos');
      setStatus(data.estatus_validacion || 'Sin enviar');
      if (data.estatus_validacion === 'Rechazado') {
        setMotivo(data.motivo_rechazo);
      }
    } catch (error) {
      if (error instanceof AuthError) handleAuthError(error.message);
      else console.error("Error al cargar estatus:", error);
    }
  }, [handleAuthError]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // --- MANEJADORES DE ARCHIVOS ---
  const handleCurpChange = (e) => {
    if (e.target.files[0]) {
      setCurpDocument(e.target.files[0]);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      // Creamos la URL para la vista previa
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curpDocument || !photo) return alert('Sube ambos archivos.');

    const formData = new FormData();
    formData.append('foto', photo);
    formData.append('curp', curpDocument);

    try {
      await api.post('/documentos/renade', formData);
      alert('¡Documentos enviados!');
      // Limpiamos estados
      setCurpDocument(null);
      setPhoto(null);
      setPhotoPreview('');
      fetchStatus(); 
    } catch (error) {
        alert('Error al enviar.');
    }
  };

  // --- RENDERIZADO ---

  if (status === 'loading') return <p>Cargando estatus...</p>;

  if (status === 'Validado') {
    return (
      <div className="renade-status-card success">
        <StatusIcon status="Validado" />
        <h3>¡Trámite Completado!</h3>
        <p>Tus documentos han sido aprobados correctamente.</p>
      </div>
    );
  }

  if (status === 'Pendiente') {
    return (
      <div className="renade-status-card warning">
        <StatusIcon status="Pendiente" />
        <h3>En Proceso de Validación</h3>
        <p>Tus documentos están siendo revisados por un administrador.</p>
      </div>
    );
  }

  // --- FORMULARIO (Para "Sin enviar" o "Rechazado") ---
  return (
    <div>
      <h3>Solicitud de RENADE</h3>
      
      {status === 'Rechazado' && (
        <div className="alert-box error" style={{padding:'15px', backgroundColor:'#ffebee', border:'1px solid red', borderRadius:'8px', marginBottom:'20px', display:'flex', gap:'10px', alignItems:'center'}}>
             <AlertIcon />
             <div>
                <h4 style={{margin:0, color:'#c62828'}}>Solicitud Rechazada</h4>
                <p style={{margin:'5px 0'}}><strong>Motivo:</strong> {motivo || 'No especificado'}</p>
             </div>
        </div>
      )}

      {status === 'Sin enviar' && <p>Sube tu fotografía y CURP para comenzar.</p>}

      <form onSubmit={handleSubmit} className="renade-form">
        <div className="file-upload-container">

          <label htmlFor="photo-upload" className="file-upload-box" style={{cursor:'pointer'}}>
            <h3>Sube tu Fotografía</h3>
            {photoPreview ? (
              <img 
                src={photoPreview} 
                alt="Vista previa" 
                className="photo-preview" 
                style={{width:'100px', height:'100px', objectFit:'cover', borderRadius:'8px', marginTop:'10px'}} 
              />
            ) : ( 
              <div style={{marginTop:'10px'}}><PhotoIcon /></div> 
            )}
            <span style={{display:'block', marginTop:'10px', fontSize:'0.9em', color:'#666'}}>
                {photo ? photo.name : 'Haz clic para seleccionar (JPG)'}
            </span>
          </label>
          <input id="photo-upload" type="file" accept=".jpg, .jpeg, .png" onChange={handlePhotoChange} style={{display:'none'}} />
          <label htmlFor="curp-upload" className="file-upload-box" style={{cursor:'pointer'}}>
            <h3>Sube tu CURP</h3>
            <div style={{marginTop:'10px'}}>

                <PdfIcon filled={!!curpDocument} />
            </div>
            <span style={{display:'block', marginTop:'10px', fontSize:'0.9em', color: curpDocument ? '#2e7d32' : '#666', fontWeight: curpDocument ? 'bold' : 'normal'}}>
                {curpDocument ? `Listo: ${curpDocument.name}` : 'Haz clic para seleccionar (PDF)'}
            </span>
          </label>
          <input id="curp-upload" type="file" accept=".pdf" onChange={handleCurpChange} style={{display:'none'}} />

        </div>
        
        <button type="submit" className="btn btn-primary" style={{marginTop:'20px'}}>
            {status === 'Rechazado' ? 'Reintentar Envío' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}

export default RenadeSection;