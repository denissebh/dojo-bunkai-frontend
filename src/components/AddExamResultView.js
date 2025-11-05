import React, { useState, useEffect } from 'react';


const kyuGrades = ['10mo Kyu', '9no Kyu', '8vo Kyu', '7mo Kyu', '6to Kyu', '5to Kyu', '4to Kyu', '3er Kyu', '2do Kyu', '1er Kyu'];
const danGrades = ['1er Dan', '2do Dan', '3er Dan', '4to Dan', '5to Dan', '6to Dan', '7mo Dan', '8vo Dan', '9no Dan', '10mo Dan'];

function AddExamResultView() {
  // --- Estados para los datos de la API ---
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 


  const [selectedUserType, setSelectedUserType] = useState('alumno');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(''); 
  const [examDate, setExamDate] = useState('');
  const [result, setResult] = useState('Aprobado');
  const [puntuacion, setPuntuacion] = useState(''); 

 
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      // Obtenemos el token (usando 'accessToken')
      const token = localStorage.getItem('accessToken'); 

      if (!token) {
        alert('Error: No se encontró sesión. Por favor, vuelve a iniciar sesión.');
        setIsLoading(false);
        return; 
      }
      
      try {
        
        const response = await fetch('http://localhost:4000/api/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
             alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
          }
          throw new Error(`Error al cargar usuarios: ${response.statusText}`);
        }
        
        const allUsers = await response.json();

        // Filtramos los usuarios por ROL 
        const studentsData = allUsers.filter(user => user.rol === 'Alumno');
        const professorsData = allUsers.filter(user => user.rol === 'Profesor');

        setStudents(studentsData);
        setProfessors(professorsData);

      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        alert("No se pudo cargar la lista de usuarios. Revisa la consola.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUsers();
  }, []); 

  
  const usersToList = selectedUserType === 'alumno' ? students : professors;
  const gradesToList = selectedUserType === 'alumno' ? kyuGrades : danGrades;

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    // Obtenemos el token para enviar datos
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Error: Tu sesión ha expirado. No se puede guardar. Inicia sesión de nuevo.');
      return;
    }

    const dataToSend = { 
      userId: selectedUserId, 
      gradoAlcanzado: selectedGrade, 
      date: examDate, 
      result: result,
      puntuacion: puntuacion 
    };

    try {
      //Hacemos POST al endpoint de seguimiento con el token
      const response = await fetch('http://localhost:4000/api/seguimiento/examenes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) throw new Error('Error al guardar el resultado.');

      const savedResult = await response.json();
      console.log('Resultado de examen guardado:', savedResult);
      alert('Resultado de examen guardado exitosamente.');
      
      // Limpiar formulario
      setSelectedUserId('');
      setSelectedGrade('');
      setExamDate('');
      setResult('Aprobado');
      setPuntuacion('');

    } catch (error) {
      console.error('Error al guardar examen:', error);
      alert('Hubo un error al guardar el resultado del examen.');
    }
  };

  // --- Renderizado del componente ---
  return (
    <div>
      <h3>Agregar Resultado de Examen</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <div className="form-row">
          <select 
            value={selectedUserType} 
            onChange={(e) => { setSelectedUserType(e.target.value); setSelectedUserId(''); setSelectedGrade(''); }}
            disabled={isLoading}
          >
            <option value="alumno">Alumno (Kyu)</option>
            <option value="profesor">Profesor (Dan)</option>
          </select>
          <select 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)} 
            required
            disabled={isLoading}
          >
            <option value="">
              {isLoading 
                ? 'Cargando usuarios...' 
                : `Selecciona ${selectedUserType === 'alumno' ? 'Alumno' : 'Profesor'}...`
              }
            </option>
            {usersToList.map(user => 
              <option key={user.id} value={user.id}>{user.nombre}</option>
            )}
          </select>
        </div>
        <div className="form-row">
           <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
           <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} required>
             <option value="">Selecciona Grado Alcanzado...</option>
             {gradesToList.map(grade => <option key={grade} value={grade}>{grade}</option>)}
           </select>
           <select value={result} onChange={(e) => setResult(e.target.value)}>
             <option value="Aprobado">Aprobado</option>
             <option value="Reprobado">Reprobado</option>
           </select>
        </div>
        
        <input 
          type="text" 
          placeholder="Puntuación" 
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Guardar Resultado Examen
        </button>
      </form>
    </div>
  );
}

export default AddExamResultView;