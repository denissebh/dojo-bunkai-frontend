import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function CreateProfessorForm() {
  const [formData, setFormData] = useState({ nombre: '',apellido_paterno: '',  apellido_materno: '', correo_electronico: '', cargo: '', edad: '', grado: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Error: No se encontró token de sesión. Por favor, inicie sesión de nuevo.');
      localStorage.removeItem('userData');
      navigate('/login');
      return;
    }


    try {
    
      const response = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...formData, rol: 'Profesor' }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
           alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
           localStorage.removeItem('userData');
           localStorage.removeItem('accessToken');
           navigate('/login');
           return; 
        }
        throw new Error('La respuesta del servidor no fue exitosa');
      }

      const nuevoProfesor = await response.json();
      
      alert(`¡Profesor "${nuevoProfesor.nombre}" creado exitosamente!`);
      console.log('Profesor guardado en la BD:', nuevoProfesor);
      
      setFormData({ nombre: '',apellido_paterno: '',  apellido_materno: '', correo_electronico: '', cargo: '', edad: '', grado: '' });

    } catch (error) {
      console.error('Error al crear el profesor:', error);
      alert('Hubo un error al crear el profesor. Revisa la consola.');
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
        <button type="submit" className="btn btn-primary">Crear Profesor</button>
      </form>
    </div>
  );
}

export default CreateProfessorForm;
