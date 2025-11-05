import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditarDatosView({ alumno, onProfileUpdate, changeView }) {

  const [formData, setFormData] = useState({
    nombre: alumno.nombre || '',
    apellido_paterno: alumno.apellido_paterno || '',
    apellido_materno: alumno.apellido_materno || '',
    correo_electronico: alumno.correo_electronico || '', 
    telefono: alumno.telefono || '',
    curp: alumno.curp || '',
    fecha_nacimiento: alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento).toISOString().split('T')[0] : '',
    grupo_sanguineo: alumno.grupo_sanguineo || '',
    alergias: alumno.alergias || ''
    
  });
  const navigate = useNavigate(); 


  const handleAuthError = (error) => {
    console.error("Error de autenticación:", error);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return handleAuthError('No se encontró token');
    }
    try {

      const response = await fetch(`http://localhost:4000/api/usuarios/${alumno.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData), 
      });
   
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
           return handleAuthError('Token inválido');
        }
        throw new Error('Error al guardar los cambios.');
      }

      // Obtiene los datos actualizados del usuario desde la respuesta de la API
      const updatedUser = await response.json();
      localStorage.setItem('userData', JSON.stringify(updatedUser)); // Actualiza localStorage
      alert('¡Perfil actualizado exitosamente!');
      
      // Llama a la función del componente padre para recargar los datos del perfil
      if (onProfileUpdate) {
        await onProfileUpdate(); // Espera a que los datos se recarguen
      }
  
      // Llama a la función del componente padre para cambiar la vista de vuelta a "Mi Perfil"
      if (changeView) {
          changeView('miPerfil');
      }

    } catch (error) {
      // Muestra un mensaje de error si algo falla
      console.error('Error al actualizar:', error);
      if (error.message.includes('Token inválido')) return;
      alert('Hubo un error al guardar los cambios.');
    }
  };

  // Renderiza el formulario
  return (
    <div>
      <h3>Editar Datos Personales</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">

        <label>Nombre(s)</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />

        <label>Apellido Paterno</label>
        <input type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} />

        <label>Apellido Materno</label>
        <input type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} />

        <label>Correo Electrónico</label>
        <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} />

        <label>Teléfono</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />

        <label>Fecha de Nacimiento</label>
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />

        <label>CURP</label>
        <input type="text" name="curp" value={formData.curp} onChange={handleChange} />

        <label>Grupo Sanguíneo</label>
        <input type="text" name="grupo_sanguineo" value={formData.grupo_sanguineo} onChange={handleChange} />

        <label>Alergias</label>
        <textarea name="alergias" rows="3" value={formData.alergias} onChange={handleChange} />

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarDatosView;
