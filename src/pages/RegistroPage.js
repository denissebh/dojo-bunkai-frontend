import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORTA useNavigate

function RegistroPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    curp: '',
    fecha_nacimiento: '',
    edad: '',
    correo_electronico: '',
    telefono: '',
    password: '',
    passwordConfirm: ''
  });
  
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);

  // --- FUNCIÓN handleSubmit ACTUALIZADA ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación de contraseñas
    if (formData.password !== formData.passwordConfirm) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Preparamos los datos para enviar, añadiendo el ROL
      const dataToSend = { ...formData, rol: 'Alumno' };

      const response = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Hubo un error al registrar el alumno.');
      }

      const nuevoAlumno = await response.json();
      console.log('Alumno registrado:', nuevoAlumno);
      alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
      
      // Redirigimos al usuario a la página de login
      navigate('/login');

    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error al registrar el alumno. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="page-container">
      <div className="container contact-section">
        <h2>Registro de Alumno</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          {step === 1 && (
            <>
              <p className="form-step-indicator">Paso 1 de 2: Datos Personales</p>
              <input type="text" name="nombre" placeholder="Nombres" value={formData.nombre} onChange={handleChange} required />
              <input type="text" name="apellido_paterno" placeholder="Apellido Paterno" value={formData.apellido_paterno} onChange={handleChange} required />
              <input type="text" name="apellido_materno" placeholder="Apellido Materno" value={formData.apellido_materno} onChange={handleChange} />
              <input type="text" name="curp" placeholder="CURP" value={formData.curp} onChange={handleChange} />
              <div className="form-row">
                <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
                <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} />
              </div>
              <input type="email" name="correo_electronico" placeholder="Correo Electrónico" value={formData.correo_electronico} onChange={handleChange} required />
              <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
              <button type="button" onClick={nextStep} className="btn btn-secondary">Siguiente</button>
            </>
          )}
          {step === 2 && (
            <>
              <p className="form-step-indicator">Paso 2 de 2: Datos de la Cuenta</p>
              <input type="password" name="password" placeholder="Crea una contraseña" value={formData.password} onChange={handleChange} required />
              <input type="password" name="passwordConfirm" placeholder="Repite tu contraseña" value={formData.passwordConfirm} onChange={handleChange} required />
              <button type="submit" className="btn btn-primary">Registrar Alumno</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistroPage;