import React, { useState } from 'react';

function EditarDatosView({ alumno }) {
  const [formData, setFormData] = useState({
    nombre: alumno.nombre,
    email: alumno.email,
    telefono: alumno.telefono
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Datos actualizados (simulación).');
    console.log(formData);
  };

  return (
    <div>
      <h3>Editar Datos Personales</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <label>Nombre Completo</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        
        <label>Correo Electrónico</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Teléfono</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />

        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}
export default EditarDatosView;