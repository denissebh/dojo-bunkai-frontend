import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api';

function AddSeminarView() {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const [selectedUserType, setSelectedUserType] = useState('alumno');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [descripcion, setDescripcion] = useState(''); 
  const [fecha, setFecha] = useState('');
  const [ponente, setPonente] = useState(''); 
  
  const navigate = useNavigate(); 
  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await api.get('/usuarios');
        
        const studentsData = allUsers.filter(user => user.rol === 'Alumno');
        const professorsData = allUsers.filter(user => user.rol === 'Profesor');

        setStudents(studentsData);
        setProfessors(professorsData);

      } catch (error) {
        if (error instanceof AuthError) {
          handleAuthError(error.message);
        } else {
          console.error("Error al cargar usuarios:", error);
          alert(`No se pudo cargar la lista de usuarios: ${error.message}`);
        }
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUsers();
  }, [handleAuthError]); 

  const usersToList = selectedUserType === 'alumno' ? students : professors;

  //  handleSubmit
  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    const dataToSend = { 
      id_usuario: selectedUserId,       
      tipo_evento: 'Seminario',       
      descripcion: descripcion,       
      fecha: fecha,
      ponente: ponente              
    };

    try {
      const savedResult = await api.post('/seguimiento/seminarios', dataToSend);

      console.log('Resultado de seminario guardado:', savedResult);
      alert('Seminario guardado exitosamente.');
      
      setSelectedUserId('');
      setDescripcion('');
      setFecha('');
      setPonente(''); 

    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al guardar seminario:', error);
        alert(`Hubo un error al guardar el resultado: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h3>Agregar Asistencia a Seminario</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <div className="form-row">
          <select 
            value={selectedUserType} 
            onChange={(e) => { setSelectedUserType(e.target.value); setSelectedUserId(''); }}
            disabled={isLoading}
          >
            <option value="alumno">Alumno</option>
            <option value="profesor">Profesor</option>
          </select>
          <select 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)} 
            required
            disabled={isLoading}
          >
            <option value="">
              {isLoading 
                ? 'Cargando...' 
                : `Selecciona ${selectedUserType === 'alumno' ? 'Alumno' : 'Profesor'}...`
              }
            </option>
            {usersToList.map(user => 
              <option key={user.id} value={user.id}>{user.nombre}</option>
            )}
          </select>
        </div>
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Nombre del Seminario" 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)} 
            required
          />
           <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required 
          />
        </div>

        <div className="form-row">
          <input 
            type="text" 
            placeholder="Nombre del Ponente" 
            value={ponente}
            onChange={(e) => setPonente(e.target.value)} 
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Guardar Asistencia
        </button>
      </form>
    </div>
  );
}

export default AddSeminarView;