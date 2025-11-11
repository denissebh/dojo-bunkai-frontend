import React, { useState, useEffect, useCallback } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api';

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

  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]); 

  const fetchAlumnos = useCallback(async () => {
    try {
      const data = await api.get('/usuarios');
      setAlumnos(data.filter(u => u.rol === 'Alumno' || u.rol === 'Profesor'));

    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al cargar alumnos:', error);
        alert('No se pudo cargar la lista de alumnos.');
      }
    }
  }, [handleAuthError]);

  //  useEffect
  useEffect(() => {
    fetchAlumnos();
  }, [fetchAlumnos]); 

  const handleAsistencia = (alumnoId, tipo) => { 
    console.log(`Registrar ${tipo} para alumno ${alumnoId}`);
  };

  const alumnosKyu = alumnos.filter(a => a.rol === 'Alumno').sort((a,b) => parseInt(b.grado) - parseInt(a.grado));
  const cintasNegras = alumnos.filter(a => a.rol === 'Profesor').sort((a,b) => parseInt(a.grado) - parseInt(b.grado));

  return (
    <div>
      <h3>Lista de Alumnos y Asistencia</h3>
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