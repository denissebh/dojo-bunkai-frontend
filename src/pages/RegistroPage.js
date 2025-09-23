import React, { useState } from 'react';

function RegistroPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    fechaNacimiento: '',
    edad: '',
    correo: '',
    telefono: '',
    username: '', // Lo mantenemos en el estado, pero se llenará automáticamente
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // --- FUNCIÓN MODIFICADA ---
  const nextStep = () => {
    // Asignamos el correo como el nombre de usuario antes de pasar al siguiente paso
    setFormData(prevState => ({
      ...prevState,
      username: prevState.correo 
    }));
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    alert('¡Registro enviado! Revisa la consola para ver los datos.');
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="contact-section">
      <div className="container">
        <h2>Registro de Alumno</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          {step === 1 && (
            <>
              <p className="form-step-indicator">Paso 1 de 2: Datos Personales</p>
              <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
              <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" value={formData.apellidoPaterno} onChange={handleChange} required />
              <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" value={formData.apellidoMaterno} onChange={handleChange} required />
              <input type="text" name="curp" placeholder="CURP" value={formData.curp} onChange={handleChange} required />
              <div className="form-row">
                <input type="date" name="fechaNacimiento" placeholder="Fecha de Nacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
                <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required />
              </div>
              <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required />
              <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
              <button type="button" onClick={nextStep} className="btn btn-secondary">Siguiente</button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="form-step-indicator">Paso 2 de 2: Datos de la Cuenta</p>
              {/* --- CAMPO DE USUARIO ELIMINADO --- */}
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