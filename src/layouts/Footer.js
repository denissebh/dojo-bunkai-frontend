import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <div className="social-icons">
          <span>&#128241;</span>
          <span>&#128222;</span>
        </div>
        <div className="footer-links">
        <Link to="/calendario">Calendario de Actividades</Link>
        <Link to="/ubicacion">Ubicación</Link>
        <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;