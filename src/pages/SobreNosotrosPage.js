import React from 'react';
import foto1 from '../assets/images/Kyoshi1.png'; 
import foto2 from '../assets/images/RenshiG.jpg'; 
import foto3 from '../assets/images/SenseiFer.jpg'; 
import foto4 from '../assets/images/SenseiDenisse.jpg'; 
import foto5 from '../assets/images/SenseiMaruri.jpeg'; 

function SobreNosotrosPage() {
  return (
    <div className="page-container">
      <div className="container">
        <h2>Nuestra Trayectoria</h2>
        <p className="intro-text">
          Dojo Bunkai es una escuela de Karate-Do con la técnica Shudokan, fundada por el Kyoshi Francisco Barroso de Luna el 9 de octubre de 2005. Desde nuestros inicios en San Cristóbal, Ecatepec de Morelos, nos hemos dedicado a la formación integral de nuestros alumnos, fomentando la disciplina, el respeto y la superación a través del "camino de la mano vacía".
        </p>
        
        <hr className="divider" />

        <h2>Nuestros Senseis</h2>
        <p>Un equipo de instructores dedicados y apasionados por la enseñanza del Karate-Do.</p>
        <div className="sensei-grid">
          <div className="sensei-card">
            <img src={foto1} alt="Foto de Francisco Barroso de Luna" />
            <h3>Francisco Barroso De Luna</h3>
            <span>Kyoshi - 7mo Dan - Presidente y fundador </span>
          </div>
          <div className="sensei-card">
            <img src={foto3} alt="Foto de Sensei 2" />
            <h3>Fernanda Y. Barroso Herrera</h3>
            <span>Sensei - 4to Dan - Vicepresidenta</span>
          </div>
          <div className="sensei-card">
            <img src={foto4} alt="Foto de Sensei 3" />
            <h3>Fabiola D. Barroso Herrera</h3>
            <span>Sensei - 2do Dan - Directora General</span>
          </div>
          <div className="sensei-card">
            <img src={foto5} alt="Foto de Sensei 4" />
            <h3>Juan A. Maruri Jimenez</h3>
            <span>Sensei - 4to Dan- Director Tecnico y Juridico</span>
          </div>
          <div className="sensei-card">
            <img src={foto2} alt="Foto de Sensei 5" />
            <h3>Genaro Gonzalez Carmona</h3>
            <span>Renshi - 5to Dan - Directo Tecnico</span>
          </div>
        </div>

        {/* Aquí puedes agregar una galería de fotos/videos en el futuro */}
      </div>
    </div>
  );
}

export default SobreNosotrosPage;