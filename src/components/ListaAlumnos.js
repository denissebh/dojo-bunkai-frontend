import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState([]); 
  const navigate = useNavigate(); 

  const handleAuthError = (errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  // Obtiene los datos de los alumnos 
  useEffect(() => {
    const fetchAlumnos = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return handleAuthError('No se encontró token');
      }

      try {
        const response = await fetch('http://localhost:4000/api/usuarios', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            return handleAuthError('Token inválido');
          }
          throw new Error('No se pudo cargar la lista de alumnos');
        }

        const data = await response.json();
        
        // Filtramos para obtener solo Alumnos y Profesores (roles con grado)
        setAlumnos(data.filter(u => u.rol === 'Alumno' || u.rol === 'Profesor'));

      } catch (error) {
        console.error('Error al cargar alumnos:', error);
        if (!error.message.includes('Token inválido')) {
          alert('No se pudo cargar la lista de alumnos.');
        }
      }
    };

    fetchAlumnos();
  }, [navigate]); 

  const handleAsistencia = (alumnoId, tipo) => { /*...*/ };
  const alumnosKyu = alumnos.filter(a => a.rol === 'Alumno').sort((a,b) => parseInt(b.grado) - parseInt(a.grado));
  const cintasNegras = alumnos.filter(a => a.rol === 'Profesor').sort((a,b) => parseInt(a.grado) - parseInt(b.grado));


  return (
    <div>
      <h3>Lista de Alumnos y Asistencia</h3>
      
      {/* Tabla Grados Kyu (Alumnos) */}
      <div className="grado-section">
        <h4 className="grado-header">Grados Kyu (Alumnos)</h4>
        <div className="payment-table-container">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Grado</th>
                <th>Edad</th> 
                <th>Fecha Nacimiento</th> 
                <th>Asistencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnosKyu.map(alumno => (
                <tr key={alumno.id}>
                  <td>{`${alumno.nombre} ${alumno.apellido_paterno || ''}`}</td>
                  <td>{alumno.grado}</td>
                  <td>{calculateAge(alumno.fecha_nacimiento)}</td>
                  <td>{alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento).toLocaleDateString('es-MX', { timeZone: 'UTC' }) : 'N/A'}</td>
                  <td className="asistencia-controls">
                    <button onClick={() => handleAsistencia(alumno.id, 'asistencia')} className="asistencia-btn presente">A</button>
                    <button onClick={() => handleAsistencia(alumno.id, 'falta')} className="asistencia-btn falta">F</button>
                    <button onClick={() => handleAsistencia(alumno.id, 'permiso')} className="asistencia-btn permiso">P</button>
                  </td>
                  <td>
                    <Link to={`/profesor/alumno/${alumno.id}`} className="btn-edit">Ver</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla Cintas Negras (Profesores) */}
      <div className="grado-section">
        <h4 className="grado-header">Cintas Negras (Profesores)</h4>
        <div className="payment-table-container">
           <table className="payment-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Grado</th>
                <th>Edad</th>
                <th>Fecha Nacimiento</th>
                <th>Asistencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cintasNegras.map(cintaNegra => (
                <tr key={cintaNegra.id}>
                  <td>{`${cintaNegra.nombre} ${cintaNegra.apellido_paterno || ''}`}</td>
                  <td>{cintaNegra.grado}</td>
                  <td>{calculateAge(cintaNegra.fecha_nacimiento)}</td>
                  <td>{cintaNegra.fecha_nacimiento ? new Date(cintaNegra.fecha_nacimiento).toLocaleDateString('es-MX', { timeZone: 'UTC' }) : 'N/A'}</td>
                  <td className="asistencia-controls">
                    {/* Botones A, F, P */}
                    <button onClick={() => handleAsistencia(cintaNegra.id, 'asistencia')} className="asistencia-btn presente">A</button>
                    <button onClick={() => handleAsistencia(cintaNegra.id, 'falta')} className="asistencia-btn falta">F</button>
                    <button onClick={() => handleAsistencia(cintaNegra.id, 'permiso')} className="asistencia-btn permiso">P</button>
                  </td>
                  <td>
                    <Link to={`/profesor/alumno/${cintaNegra.id}`} className="btn-edit">Ver</Link>
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
