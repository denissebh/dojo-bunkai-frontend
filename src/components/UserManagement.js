import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function UserManagement() {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // --- NUEVO
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
          throw new Error('No se pudo obtener la lista de usuarios.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        if (error.message.includes('Token inválido')) return;
        alert('No se pudo cargar la lista de usuarios.');
      }
    };
    fetchUsers();
  
  }, []); 
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre || '',
      apellido_paterno: user.apellido_paterno || '',
      apellido_materno: user.apellido_materno || '',
      correo_electronico: user.correo_electronico || '',
      telefono: user.telefono || '',
      curp: user.curp || '',
      fecha_nacimiento: user.fecha_nacimiento ? new Date(user.fecha_nacimiento).toISOString().split('T')[0] : '',
      grupo_sanguineo: user.grupo_sanguineo || '',
      alergias: user.alergias || '',
      grado: user.grado || '',
      edad: user.edad || '', 
    });
  };

  const handleCancel = () => { setSelectedUser(null); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return handleAuthError('No se encontró token');
    }


    const dataToSend = {
      ...selectedUser,
      nombre: formData.nombre,
      apellido_paterno: formData.apellido_paterno,
      apellido_materno: formData.apellido_materno,
      correo_electronico: formData.correo_electronico,
      telefono: formData.telefono,
      curp: formData.curp,
      fecha_nacimiento: formData.fecha_nacimiento,
      grupo_sanguineo: formData.grupo_sanguineo,
      alergias: formData.alergias,
      grado: formData.grado,
      edad: formData.edad ? parseInt(formData.edad) : null,
    };

    console.log("Datos que se enviarán al backend:", dataToSend);

    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(dataToSend), 
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return handleAuthError('Token inválido');
        }
        let errorMsg = 'Error al guardar los cambios.';
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch(jsonError) { /* No hacer nada si no hay JSON */ }
        throw new Error(errorMsg);
      }
      const updatedUser = await response.json();

      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ));

      alert(`Perfil de ${updatedUser.nombre} actualizado exitosamente.`);
      setSelectedUser(null);

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert(`Hubo un error al guardar los cambios: ${error.message}`);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${userName}?`)) {

      const token = localStorage.getItem('accessToken');
      if (!token) {
        return handleAuthError('No se encontró token');
      }


      try {
        const response = await fetch(`http://localhost:4000/api/usuarios/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
     

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            return handleAuthError('Token inválido');
          }
          throw new Error('Error al eliminar el usuario.');
        }
        
        setUsers(users.filter(user => user.id !== userId));
        alert('Usuario eliminado exitosamente.');

      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Hubo un error al eliminar el usuario.');
      }
    }
  };
  
  // --- VISTA DE LA LISTA DE USUARIOS ---
  if (!selectedUser) {
    return (
      <div>
        <h3>Lista de Usuarios</h3>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-list-item">
              <div className="user-info">
                <strong>{user.nombre}</strong>
                <span>{user.rol} - {user.grado || 'N/A'}</span>
              </div>
              <div className="user-actions">
                <button onClick={() => handleEditClick(user)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(user.id, user.nombre)} className="btn-delete">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // --- VISTA DEL FORMULARIO DE EDICIÓN ---
  return (
    <div>
      <h3>Editando Perfil de: {selectedUser.nombre}</h3>
      <form onSubmit={handleSave} className="contact-form admin-form">
        <input type="text" name="nombre" placeholder="Nombre Completo" value={formData.nombre || ''} onChange={handleChange} />
        <input type="email" name="correo_electronico" placeholder="Correo Electrónico" value={formData.correo_electronico || ''} onChange={handleChange} />
        <input type="text" name="grado" placeholder="Grado" value={formData.grado || ''} onChange={handleChange} />
        <div className="form-row">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default UserManagement;
