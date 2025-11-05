import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateHeader({ title }) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); 


  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserName(userData.nombre || userData.correo_electronico || 'Usuario');
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <header className="private-header">
      <div className="container">
        <span className="panel-title">{title}</span>
        <div className="user-info">
          <span>Hola, {userName}</span>
          <button onClick={handleLogout} className="logout-btn-header">
           Cerrar Sesión
          </button>
        </div>

      </div>
    </header>
  );
}

export default PrivateHeader;
