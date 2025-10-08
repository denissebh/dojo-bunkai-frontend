import React, { useState } from 'react';

function CreateProfessorForm() {
  const [formData, setFormData] = useState({ nombre: '',apellido_paterno: '',  apellido_materno: '', cargo: '', edad: '', grado: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Añadimos el rol directamente aquí al enviar los datos
        body: JSON.stringify({ ...formData, rol: 'Profesor' }),
      });

      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue exitosa');
      }

      const nuevoProfesor = await response.json();
      
      alert(`¡Profesor "${nuevoProfesor.nombre}" creado exitosamente!`);
      console.log('Profesor guardado en la BD:', nuevoProfesor);
      
      setFormData({ nombre: '', cargo: '', edad: '', grado: '' });

    } catch (error) {
      console.error('Error al crear el profesor:', error);
      alert('Hubo un error al crear el profesor. Revisa la consola.');
    }
  };

  return (
    <div>
      <h3>Crear Perfil de Profesor</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <input type="text" name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleChange} required />
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