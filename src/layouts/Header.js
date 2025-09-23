import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // <-- Importa NavLink

function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo">DOJO BUNKAI</Link>
        <nav className="main-nav">
          <NavLink 
            to="/"
            style={({ isActive }) => ({
              color: isActive ? '#c0392b' : '#333',
            })}
          >
            Inicio
          </NavLink>
          <NavLink 
             to="/renade" // <-- MODIFICA ESTA LÍNEA
             style={({ isActive }) => ({
             color: isActive ? '#c0392b' : '#333',
             })}
          >
            RENADE
          </NavLink>
          <NavLink 
            to="/login"
            style={({ isActive }) => ({
              color: isActive ? '#c0392b' : '#333',
            })}
          >
            Login
          </NavLink>
          <NavLink 
  to="/registro" 
  style={({ isActive }) => ({
    color: isActive ? '#c0392b' : '#333',
  })}
>
  Registro
</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;