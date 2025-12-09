import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function NuevoPassword() {
  const { token } = useParams(); // Captura el token de la URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/auth/nuevo-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('¡Contraseña actualizada con éxito!');
        // Redirigimos al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.error || 'El enlace es inválido o ha expirado.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="page-container contact-section">
      <div className="container">
        <h2>Nueva Contraseña</h2>

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

        {!mensaje && (
            <form onSubmit={handleSubmit} className="contact-form">
            <input 
                type="password" 
                placeholder="Nueva Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
            />
            <input 
                type="password" 
                placeholder="Confirmar Contraseña" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
            />
            <button type="submit" className="btn btn-primary">Guardar Contraseña</button>
            </form>
        )}

        {mensaje && (
             <div className="login-links-container" style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/login" className="login-link">Ir a Iniciar Sesión</Link>
             </div>
        )}
      </div>
    </div>
  );
}

export default NuevoPassword;