import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  // Estados para guardar lo que el usuario escribe en los campos
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook de React Router para poder redirigir al usuario
  const navigate = useNavigate();

  // Función que se ejecuta al presionar el botón "Acceder"
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Verificamos las credenciales hardcodeadas (temporales)
    if (username === 'Admin' && password === 'Bunkai25') {
      alert('¡Bienvenido, Administrador!');
      navigate('/admin/dashboard'); // Redirige al panel de admin
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="contact-section">
      <div className="container">
        <h2>Iniciar Sesión</h2>
        {/* Asociamos la función handleLogin con el formulario */}
        <form onSubmit={handleLogin} className="contact-form">
          <input 
            type="text" 
            placeholder="Usuario " 
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del usuario
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
            required 
          />
          <button type="submit" className="btn btn-primary">Acceder</button>
        </form>

        <div className="login-links-container">
          <Link to="/forgot-password" className="login-link">
            No recuerdo mi contraseña
          </Link>
          <Link to="/registro" className="login-link">
            ¿Aún no tienes una cuenta? Regístrate
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;