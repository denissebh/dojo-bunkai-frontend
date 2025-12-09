import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [correo_electronico, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:4000/api/auth/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            correo_electronico: correo_electronico, 
            password: password 
          }),
        }
      );

      const data = await response.json(); 

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión.');
      }

      // Guardamos el Token y el Perfil de Usuario
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user)); // El perfil está en 'data.user'

      // ¡Inicio de sesión exitoso!
      console.log('Login exitoso, perfil de DB:', data.user);


      switch (data.user.rol) {
        case 'Administrador':
          navigate('/admin/dashboard');
          break;
        case 'Profesor':
          navigate('/profesor/dashboard');
          break;
        case 'Alumno':
          navigate('/alumno/dashboard');
          break;
        default:
          navigate('/'); 
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert(error.message || 'Hubo un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="page-container contact-section">
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="contact-form">
          <input 
            type="email"
            placeholder="Correo Electrónico" 
            value={correo_electronico}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn btn-primary">Acceder</button>
        </form>

        <div className="login-links-container">
         <Link to="/olvide-password" className="login-link">
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

