import React from 'react';
function MiPerfilView({ alumno, onEditClick }) {
    if (!alumno) return <p>Cargando perfil...</p>;
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificado';
    return new Date(dateString).toLocaleDateString();
  };
  return (
    <div>
      <h3>Mi Perfil</h3>
      <div className="profile-details">
        <p><strong>ID:</strong> {alumno.id}</p>
        <p><strong>Nombre Completo:</strong> {`${alumno.nombre || ''} ${alumno.apellido_paterno || ''} ${alumno.apellido_materno || ''}`}</p>
        <p><strong>Grado:</strong> {alumno.grado}</p>
        <p><strong>Correo Electrónico:</strong> {alumno.email || 'No especificado'}</p>
        <p><strong>Teléfono:</strong> {alumno.telefono || 'No especificado'}</p>
        <p><strong>Fecha de Nacimiento:</strong> {formatDate(alumno.fecha_nacimiento)}</p>
        <p><strong>Edad:</strong> {alumno.edad || 'No especificada'}</p>
        <p><strong>CURP:</strong> {alumno.curp || 'No especificado'}</p>
        <p><strong>Grupo Sanguíneo:</strong> {alumno.grupo_sanguineo || 'No especificado'}</p>
        <p><strong>Alergias:</strong> {alumno.alergias || 'Ninguna especificada'}</p>
        <button onClick={onEditClick} className="btn btn-secondary" style={{ marginTop: '20px' }}>
          Editar Perfil
        </button>
      </div>
    </div>
  );
}
export default MiPerfilView;