import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { api, AuthError } from '../services/api'; 

function CreateProfessorForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '', 
    apellido_materno: '',
    correo_electronico: '',
    cargo: '', 
    grado: '',
    curp: '',
    grupo_sanguineo: '',
    alergias: ''
  });
  
  const navigate = useNavigate(); 

  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const dataToSend = { 
        ...formData, 
        rol: 'Profesor',
        password: 'dojo' + new Date().getFullYear() 
      };

      const nuevoProfesor = await api.post('/usuarios', dataToSend);
      
      alert(`¡Profesor "${nuevoProfesor.nombre}" creado exitosamente!`);
      console.log('Profesor guardado:', nuevoProfesor);
      
      // Limpiamos el formulario
      setFormData({
        nombre: '', apellido_paterno: '',  apellido_materno: '', 
        correo_electronico: '', cargo: '', edad: '', grado: '',
        curp: '', grupo_sanguineo: '', alergias: ''
      });

    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al crear el profesor:', error);
        alert(`Hubo un error al crear el profesor: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h3>Crear Perfil de Profesor</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <input type="text" name="nombre" placeholder="Nombre(s)" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellido_paterno" placeholder="Apellido Paterno" value={formData.apellido_paterno} onChange={handleChange} required />
        <input type="text" name="apellido_materno" placeholder="Apellido Materno" value={formData.apellido_materno} onChange={handleChange} />
        
        <input type="email" name="correo_electronico" placeholder="Correo Electrónico" value={formData.correo_electronico} onChange={handleChange} required />
        <input type="text" name="cargo" placeholder="Cargo en la organización" value={formData.cargo} onChange={handleChange} />
        
        <div className="form-row">
          <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required />
          <input type="text" name="grado" placeholder="Grado (ej. 5to Dan)" value={formData.grado} onChange={handleChange} required />
        </div>
        <input type="text" name="curp" placeholder="CURP" value={formData.curp} onChange={handleChange} required />
        
        <div className="form-row">
          <input type="text" name="grupo_sanguineo" placeholder="Grupo Sanguíneo" value={formData.grupo_sanguineo} onChange={handleChange} />
          <input type="text" name="alergias" placeholder="Alergias" value={formData.alergias} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Crear Profesor</button>
      </form>
    </div>
  );
}

export default CreateProfessorForm;