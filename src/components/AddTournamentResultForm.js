import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api';

function AddTournamentResultForm() {
  
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserType, setSelectedUserType] = useState('alumno');
  
  const [formData, setFormData] = useState({
    userId: '',
    tournamentName: '',
    category: 'kata',
    place: '1'
  });
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
        const data = await api.get('/usuarios');
        
        setStudents(data.filter(u => u.rol === 'Alumno'));
        setProfessors(data.filter(u => u.rol === 'Profesor'));

      } catch (error) {
        if (error instanceof AuthError) {
          handleAuthError(error.message);
        } else {
          console.error("Error fetching users:", error);
          alert(`No se pudo cargar la lista de usuarios: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  
  }, [handleAuthError]); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
        id_usuario: formData.userId, // El ID se  guarda aquí
        tipo_evento: 'Torneo',
        descripcion: formData.tournamentName,
        categoria: formData.category,
        resultado: `${formData.place}${formData.place === '1' ? 'er' : 'do'} Lugar`,
        fecha: new Date().toISOString().split('T')[0] 
    };

    console.log("Enviando datos de torneo:", dataToSend); 

    try {
      const savedResult = await api.post('/seguimiento/torneos', dataToSend);
      
      console.log('Resultado guardado:', savedResult);
      alert('Resultado de torneo guardado exitosamente.');

      setFormData({ userId: '', tournamentName: '', category: 'kata', place: '1' });

    } catch(error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error("Error guardando torneo:", error);
        alert(`Hubo un error al guardar el resultado: ${error.message}`);
      }
    }
  };

  const usersToList = selectedUserType === 'alumno' ? students : professors;

  return (
    <div>
      <h3>Agregar Resultado de Torneo</h3> 
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        
        <select
          value={selectedUserType}
          onChange={(e) => {
            setSelectedUserType(e.target.value);
            setFormData(prev => ({ ...prev, userId: '' }));
          }}
          disabled={isLoading}
        >
          <option value="alumno">Alumno (Kyu)</option>
          <option value="profesor">Profesor (Dan)</option>
        </select>

        <select
          name="userId" 
          value={formData.userId}
          onChange={handleChange}
          required
          disabled={isLoading}
        >
          <option value="">
            {isLoading 
              ? 'Cargando...' 
              : `Selecciona ${selectedUserType === 'alumno' ? 'Alumno' : 'Profesor'}...`
            }
          </option>
          {usersToList.map(user => (
            <option key={user.id} value={user.id}>
              {user.nombre} 
            </option>
          ))}
        </select>

        <input
          type="text"
          name="tournamentName"
          placeholder="Nombre del Torneo"
          value={formData.tournamentName}
          onChange={handleChange}
          required
        />
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
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Guardar Resultado
        </button>
      </form>
    </div>
  );
}

export default AddTournamentResultForm;