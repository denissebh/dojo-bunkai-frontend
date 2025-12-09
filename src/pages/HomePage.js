import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDojo from '../assets/images/DojoBunkai.jpg'; 

function HomePage() {
  // Estados para el formulario de contacto
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });
  const [status, setStatus] = useState(''); // 'enviando', 'exito', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');

    try {
      const response = await fetch('http://localhost:4000/api/comunicados/contacto-publico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('exito');
        setFormData({ nombre: '', correo: '', mensaje: '' }); // Limpiar formulario
        setTimeout(() => setStatus(''), 5000); // Borrar mensaje de éxito después de 5 seg
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

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
                  Contacto WhatsApp
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

          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="nombre" 
              placeholder="Tu Nombre Completo" 
              value={formData.nombre}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="correo" 
              placeholder="Tu Correo Electrónico" 
              value={formData.correo}
              onChange={handleChange}
              required 
            />
            <textarea 
              name="mensaje"
              rows="5" 
              placeholder="Escribe tu mensaje aquí..." 
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="btn btn-primary" disabled={status === 'enviando'}>
              {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {/* Mensajes de estado */}
            {status === 'exito' && (
              <p style={{ color: 'green', marginTop: '10px', fontWeight: 'bold' }}>
                ¡Mensaje enviado correctamente!
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
                Hubo un error al enviar. Intenta nuevamente.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default HomePage;