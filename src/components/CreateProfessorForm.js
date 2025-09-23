import React, { useState } from 'react';

function CreateProfessorForm() {
  const [formData, setFormData] = useState({ nombre: '', cargo: '', edad: '', grado: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profesor creado (simulación).');
    console.log('Datos del nuevo profesor:', formData);
    setFormData({ nombre: '', cargo: '', edad: '', grado: '' });
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