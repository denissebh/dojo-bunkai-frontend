import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { api } from '../services/api';

function RegistroPage() {
  const [step, setStep] = useState(1);
  const [isMinor, setIsMinor] = useState(false); // Estado para saber si es menor
  
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
    passwordConfirm: '',
    // Campos del Tutor
    nombre_tutor: '',
    telefono_tutor: '',
    parentesco_tutor: ''
  });
  
  const navigate = useNavigate(); 

  // Función para calcular edad automáticamente
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia la fecha de nacimiento, recalculamos la edad y si es menor
    if (name === 'fecha_nacimiento') {
        const age = calculateAge(value);
        setFormData(prev => ({ ...prev, [name]: value, edad: age }));
        setIsMinor(age < 18); // Regla de negocio: Menor de 18
    } else {
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const nextStep = () => setStep(step + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validación extra para menores
    if (isMinor && (!formData.nombre_tutor || !formData.telefono_tutor)) {
        alert('Al ser menor de edad, los datos del tutor son obligatorios.');
        return;
    }

    try {
      // Rol por defecto Alumno
      const dataToSend = { ...formData, rol: 'Alumno' };
      
      // false = No requiere token (es registro público)
      const nuevoAlumno = await api.post('/usuarios', dataToSend, false);

      console.log('Alumno registrado:', nuevoAlumno);
      alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
      navigate('/login');

    } catch (error) {
      console.error('Error en el registro:', error);
      alert(error.message || 'Hubo un error al registrar el alumno.');
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
                <div style={{flex: 1}}>
                    <label style={{fontSize:'0.8em', color:'#666'}}>Fecha de Nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
                </div>
                <div style={{flex: 1}}>
                    <label style={{fontSize:'0.8em', color:'#666'}}>Edad (Auto):</label>
                    <input type="number" name="edad" placeholder="Edad" value={formData.edad} readOnly style={{backgroundColor:'#f0f0f0'}} />
                </div>
              </div>

              <input type="email" name="correo_electronico" placeholder="Correo Electrónico (Usuario)" value={formData.correo_electronico} onChange={handleChange} required />
              <input type="tel" name="telefono" placeholder="Teléfono del Alumno (Opcional)" value={formData.telefono} onChange={handleChange} />
              
              {/* --- SECCIÓN DE TUTOR (SOLO SI ES MENOR) --- */}
              {isMinor && (
                <div style={{backgroundColor:'#fff3e0', padding:'15px', borderRadius:'8px', marginTop:'10px', border:'1px solid orange'}}>
                    <h4 style={{margin:'0 0 10px 0', color:'#e65100', fontSize:'1em'}}>Datos del Padre o Tutor (Requerido para menores)</h4>
                    <input type="text" name="nombre_tutor" placeholder="Nombre Completo del Tutor" value={formData.nombre_tutor} onChange={handleChange} required={isMinor} />
                    <div className="form-row">
                        <input type="tel" name="telefono_tutor" placeholder="Teléfono del Tutor" value={formData.telefono_tutor} onChange={handleChange} required={isMinor} />
                        <select name="parentesco_tutor" value={formData.parentesco_tutor} onChange={handleChange} required={isMinor}>
                            <option value="">Parentesco...</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Abuelo(a)">Abuelo(a)</option>
                            <option value="Tio(a)">Tío(a)</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>
              )}

              <button type="button" onClick={nextStep} className="btn btn-secondary" style={{marginTop:'15px'}}>Siguiente</button>
            </>
          )}
          {step === 2 && (
            <>
              <p className="form-step-indicator">Paso 2 de 2: Seguridad de la Cuenta</p>
              <p style={{fontSize:'0.9em', color:'#666', marginBottom:'15px'}}>
                {isMinor 
                    ? "Como tutor, asegúrate de guardar esta contraseña para supervisar el perfil del alumno."
                    : "Crea una contraseña segura para tu acceso."}
              </p>
              <input type="password" name="password" placeholder="Crea una contraseña" value={formData.password} onChange={handleChange} required />
              <input type="password" name="passwordConfirm" placeholder="Repite tu contraseña" value={formData.passwordConfirm} onChange={handleChange} required />
              
              <div style={{display: 'flex', gap: '10px'}}>
                  <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">Atrás</button>
                  <button type="submit" className="btn btn-primary">Finalizar Registro</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistroPage;