import React, { useState, useEffect } from 'react';

function AddSeminarView() {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const [selectedUserType, setSelectedUserType] = useState('alumno');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [descripcion, setDescripcion] = useState(''); 
  const [fecha, setFecha] = useState('');
  const [ponente, setPonente] = useState(''); 

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken'); 

      if (!token) {
        alert('Error: No se encontró sesión.');
        setIsLoading(false);
        return; 
      }
      
      try {
        const response = await fetch('http://localhost:4000/api/usuarios', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Error al cargar usuarios');
        
        const allUsers = await response.json();
        const studentsData = allUsers.filter(user => user.rol === 'Alumno');
        const professorsData = allUsers.filter(user => user.rol === 'Profesor');

        setStudents(studentsData);
        setProfessors(professorsData);

      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        alert("No se pudo cargar la lista de usuarios.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  const usersToList = selectedUserType === 'alumno' ? students : professors;

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Error: Tu sesión ha expirado.');
      return;
    }

    const dataToSend = { 
      id_usuario: selectedUserId,       
      tipo_evento: 'Seminario',       
      descripcion: descripcion,       
      fecha: fecha,
      ponente: ponente                
    };

    try {
      const response = await fetch('http://localhost:4000/api/seguimiento/seminarios', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) throw new Error('Error al guardar el seminario.');

      const savedResult = await response.json();
      console.log('Resultado de seminario guardado:', savedResult);
      alert('Seminario guardado exitosamente.');
      
      setSelectedUserId('');
      setDescripcion('');
      setFecha('');
      setPonente(''); 

    } catch (error) {
      console.error('Error al guardar seminario:', error);
      alert('Hubo un error al guardar el resultado del seminario.');
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