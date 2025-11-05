import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

function AddTournamentResultForm() {
  const [users, setUsers] = useState([]); 
  const [formData, setFormData] = useState({
    userId: '',
    tournamentName: '',
    category: 'kata',
    place: '1'
  });
  const navigate = useNavigate(); 


  const handleAuthError = (error) => {
    console.error("Error de autenticación:", error);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };


  useEffect(() => {
    const fetchUsers = async () => {
      
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
          throw new Error('No se pudo cargar la lista de usuarios');
        }

        const data = await response.json();
        setUsers(data.filter(u => u.rol === 'Alumno' || u.rol === 'Profesor'));
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.message.includes('Token inválido')) return;
        alert('No se pudo cargar la lista de usuarios.');
      }
    };
    fetchUsers();
  
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return handleAuthError('No se encontró token');
    }
    

    const dataToSend = {
        id_usuario: formData.userId,
        tipo_evento: 'Torneo',
        descripcion: formData.tournamentName,
        categoria: formData.category,
        resultado: `${formData.place}${formData.place === '1' ? 'er' : 'do'} Lugar`,
        fecha: new Date().toISOString().split('T')[0] 
    };

    console.log("Enviando datos de torneo:", dataToSend); 

    try {
       
        const response = await fetch('http://localhost:4000/api/seguimiento/torneos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // <-- El "pase"
            },
            body: JSON.stringify(dataToSend)
        });
        

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              return handleAuthError('Token inválido');
            }
            throw new Error('Error al guardar el resultado del torneo.');
        }

        const savedResult = await response.json();
        console.log('Resultado guardado:', savedResult);
        alert('Resultado de torneo guardado exitosamente.');

        setFormData({ userId: '', tournamentName: '', category: 'kata', place: '1' });

    } catch(error) {
        console.error("Error guardando torneo:", error);
        alert('Hubo un error al guardar el resultado.');
    }
  };

  return (
    <div>
      <h3>Agregar Resultado de Torneo</h3> 
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona Alumno o Profesor...</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nombre} ({user.rol})
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
        <button type="submit" className="btn btn-primary">Guardar Resultado</button>
      </form>
    </div>
  );
}

export default AddTournamentResultForm;
