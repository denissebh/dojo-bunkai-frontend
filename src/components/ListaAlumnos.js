import React, { useState } from 'react';

// --- DATOS DE EJEMPLO ---
const initialAlumnos = [
  { id: 1, nombre: 'Renata Martínez', grado: '4to Kyu', faltas: 1, permisos: 0 },
  { id: 2, nombre: 'Damián Hernandez', grado: '9no Kyu', faltas: 3, permisos: 1 },
  { id: 3, nombre: 'Pedro Chavez', grado: '8vo Kyu', faltas: 0, permisos: 0 },
  { id: 4, nombre: 'Fernanda Herrera', grado: '1er Dan', faltas: 0, permisos: 2 },
  { id: 5, nombre: 'Daniel Trujillo', grado: '1er Kyu', faltas: 2, permisos: 0 },
  { id: 6, nombre: 'Juan A, Maruri Jimenez', grado: '4to Dan', faltas: 0, permisos: 0 },
];

function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState(initialAlumnos);

  const handleAsistencia = (alumnoId, tipo) => {
    const updatedAlumnos = alumnos.map(alumno => {
      if (alumno.id === alumnoId) {
        const newFaltas = tipo === 'falta' ? alumno.faltas + 1 : alumno.faltas;
        
        // Lógica de notificación
        if (newFaltas > 3) {
          alert(`Notificación enviada a los padres de ${alumno.nombre} por acumular ${newFaltas} faltas.`);
        }
        
        if (tipo === 'falta') return { ...alumno, faltas: newFaltas };
        if (tipo === 'permiso') return { ...alumno, permisos: alumno.permisos + 1 };
      }
      return alumno;
    });
    setAlumnos(updatedAlumnos);
    alert(`Se ha registrado la ${tipo} para el alumno.`);
  };

  // Filtramos y ordenamos a los alumnos
  const alumnosKyu = alumnos.filter(a => a.grado.includes('Kyu')).sort((a,b) => parseInt(b.grado) - parseInt(a.grado));
  const cintasNegras = alumnos.filter(a => a.grado.includes('Dan')).sort((a,b) => parseInt(a.grado) - parseInt(b.grado));

  return (
    <div>
      <h3>Lista de Alumnos y Asistencia</h3>
      
      {/* Tabla de Grados Kyu */}
      <div className="grado-section">
        <h4 className="grado-header">Grados Kyu (10mo a 1er)</h4>
        <div className="payment-table-container">
          <table className="payment-table">
            <thead><tr><th>Nombre</th><th>Grado</th><th>Asistencia</th></tr></thead>
            <tbody>
              {alumnosKyu.map(alumno => (
                <tr key={alumno.id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.grado}</td>
                  <td className="asistencia-controls">
                    <button onClick={() => handleAsistencia(alumno.id, 'asistencia')} className="asistencia-btn presente">Asistencia</button>
                    <button onClick={() => handleAsistencia(alumno.id, 'falta')} className="asistencia-btn falta">Falta</button>
                    <button onClick={() => handleAsistencia(alumno.id, 'permiso')} className="asistencia-btn permiso">Permiso</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla de Cintas Negras */}
      <div className="grado-section">
        <h4 className="grado-header">Cintas Negras (Dan)</h4>
         <div className="payment-table-container">
          <table className="payment-table">
            <thead><tr><th>Nombre</th><th>Grado</th><th>Asistencia</th></tr></thead>
            <tbody>
              {cintasNegras.map(alumno => (
                <tr key={alumno.id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.grado}</td>
                  <td className="asistencia-controls">
                    <button onClick={() => handleAsistencia(alumno.id, 'asistencia')} className="asistencia-btn presente">Asistencia</button>
                    <button onClick={() => handleAsistencia(alumno.id, 'falta')} className="asistencia-btn falta">Falta</button>
                    <button onClick={() => handleAsistencia(alumno.id, 'permiso')} className="asistencia-btn permiso">Permiso</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListaAlumnos;