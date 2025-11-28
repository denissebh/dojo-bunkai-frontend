import React, { useState, useEffect, useCallback } from 'react';
import { api, AuthError } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ComunicadosView() {
  const [formData, setFormData] = useState({ asunto: '', mensaje: '', destinatarios: 'todos' });
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Sesión expirada.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  // Cargar historial al inicio
  const fetchHistorial = useCallback(async () => {
    try {
        const data = await api.get('/comunicados');
        setHistorial(data);
    } catch (error) {
        if (error instanceof AuthError) handleAuthError(error.message);
        else console.error(error);
    }
  }, [handleAuthError]);

  useEffect(() => {
    fetchHistorial();
  }, [fetchHistorial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!window.confirm('¿Estás seguro de enviar este correo a todos los usuarios seleccionados?')) return;

    setLoading(true);
    try {
      // AQUÍ ESTÁ LA CORRECCIÓN DE LA RUTA: /comunicados/enviar
      const response = await api.post('/comunicados/enviar', formData);
      
      alert(response.message || 'Comunicado enviado correctamente.');
      setFormData({ asunto: '', mensaje: '', destinatarios: 'todos' }); // Limpiar
      
      fetchHistorial(); // Recargar lista

    } catch (error) {
      if (error instanceof AuthError) handleAuthError(error.message);
      else alert('Error al enviar comunicado: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Enviar Nuevo Comunicado (Correo Masivo)</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        
        {/* Selector de Destinatarios */}
        <div className="form-row">
            <label style={{display:'flex', flexDirection:'column', width:'100%'}}>
                <span style={{marginBottom:'5px', fontWeight:'bold'}}>Destinatarios:</span>
                <select 
                    value={formData.destinatarios} 
                    onChange={(e) => setFormData({...formData, destinatarios: e.target.value})}
                    style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}
                >
                    <option value="todos">Todos los Usuarios</option>
                    <option value="alumnos">Solo Alumnos</option>
                    <option value="profesores">Solo Profesores</option>
                </select>
            </label>
        </div>

        {/* Campo Asunto */}
        <input 
            type="text" 
            placeholder="Asunto del Correo" 
            value={formData.asunto} 
            onChange={(e) => setFormData({...formData, asunto: e.target.value})} 
            required 
            style={{marginTop:'10px'}}
        />

        {/* Campo Mensaje */}
        <textarea 
            placeholder="Escribe el mensaje aquí..." 
            value={formData.mensaje} 
            onChange={(e) => setFormData({...formData, mensaje: e.target.value})} 
            rows="5"
            style={{width: '100%', padding: '10px', borderRadius:'5px', border: '1px solid #ccc', marginTop:'10px', fontFamily:'inherit'}}
            required
        ></textarea>
        
        <button type="submit" className="btn btn-primary" disabled={loading} style={{marginTop:'15px'}}>
            {loading ? 'Enviando Correos...' : 'Publicar y Enviar Correo'}
        </button>
      </form>

      <hr className="divider" style={{margin:'30px 0'}} />

      <h3>Historial de Comunicados</h3>
      <div className="dashboard-cards-container">
        {historial.length > 0 ? (
            historial.map(c => (
                <div key={c.id} className="dashboard-card" style={{padding:'15px'}}>
                    <h4>{c.titulo}</h4>
                    <p style={{whiteSpace: 'pre-wrap', margin:'10px 0'}}>{c.contenido}</p>
                    <small className="text-muted">Enviado: {new Date(c.fecha_publicacion).toLocaleDateString()} {new Date(c.fecha_publicacion).toLocaleTimeString()}</small>
                </div>
            ))
        ) : <p>No hay comunicados enviados.</p>}
      </div>
    </div>
  );
}

export default ComunicadosView;