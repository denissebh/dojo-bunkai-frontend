import React from 'react';
import { Link } from 'react-router-dom';
import logoDojo from '../assets/images/DojoBunkai.jpg'; 

function HomePage() {
  return (
    <>
      {/* SECCIÓN HERO */}
      <section id="inicio" className="hero">

        <div className="hero-inner">
          <div className="welcome-card">
            
            <div className="welcome-logo">
              <span className="karate-kanji">空手</span>
              <img src={logoDojo} alt="Dojo Bunkai Logo Circular" />
            </div>

            <div className="welcome-text">
              <p className="subtitle">El camino de la mano vacía</p>
              <h1>Bienvenido a Dojo Bunkai</h1>

              <div className="action-buttons">
                <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>

                <a 
                  href="https://wa.me/5215540457814"
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contacto
                </a>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* SECCIÓN CONTACTO */}
      <section id="contacto" className="contact-section">
        <div className="container">
          <h2>Contacto</h2>
          <p>¿Tienes alguna duda? Escríbenos y te responderemos a la brevedad.</p>

          <form className="contact-form">
            <input type="text" placeholder="Tu Nombre Completo" required />
            <input type="email" placeholder="Tu Correo Electrónico" required />
            <textarea rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
            <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default HomePage;
