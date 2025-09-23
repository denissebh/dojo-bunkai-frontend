import React, { useState } from 'react';

function AddTournamentResultForm() {
  const [formData, setFormData] = useState({ userId: '', tournamentName: '', category: 'kata', place: '1' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Resultado de torneo guardado (simulación).');
    console.log('Datos del resultado:', formData);
    setFormData({ userId: '', tournamentName: '', category: 'kata', place: '1' });
  };

  return (
    <div>
      <h3>Agregar Resultado de Torneo</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <input type="text" name="userId" placeholder="Nombre del Alumno o Profesor" value={formData.userId} onChange={handleChange} required />
        <input type="text" name="tournamentName" placeholder="Nombre del Torneo" value={formData.tournamentName} onChange={handleChange} required />
        <div className="form-row">
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="kata">Kata</option>
            <option value="kumite">Kumite</option>
            <option value="especial">Categoría Especial</option>
          </select>
          <select name="place" value={formData.place} onChange={handleChange}>
            <option value="1">1er Lugar</option>
            <option value="2">2do Lugar</option>
            <option value="3">3er Lugar</option>
            <option value="4">4to Lugar</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Resultado</button>
      </form>
    </div>
  );
}

export default AddTournamentResultForm;