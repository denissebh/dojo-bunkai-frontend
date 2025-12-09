import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setCargando(true);

    try {
      const response = await fetch('http://localhost:4000/api/auth/olvide-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // IMPORTANTE: Enviamos 'correo_electronico' porque así lo espera tu backend
        body: JSON.stringify({ correo_electronico: email }) 
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.msg); // "Correo enviado..."
        setEmail('');
      } else {
        setError(data.error || 'Error al procesar la solicitud.');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="page-container contact-section">
      <div className="container">
        <h2>Recuperar Contraseña</h2>
        
        {/* Mensajes de Feedback */}
        {mensaje && (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
                {mensaje}
            </div>
        )}
        {error && (
            <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <p style={{marginBottom: '15px', color: '#666'}}>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          
          <input 
            type="email"
            placeholder="Correo Electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? 'Enviando...' : 'Enviar Enlace'}
          </button>
        </form>

        <div className="login-links-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/login" className="login-link">
             Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OlvidePassword;