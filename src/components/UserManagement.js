import React, { useState, useEffect, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api'; 

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  
  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]); 

  //  useEffect (fetchUsers)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.get('/usuarios');
        setUsers(data);
      } catch (error) {
        if (error instanceof AuthError) {
          handleAuthError(error.message);
        } else {
          console.error('Error al cargar usuarios:', error);
          alert(`No se pudo cargar la lista de usuarios: ${error.message}`);
        }
      }
    };
    fetchUsers();
  
  }, [handleAuthError]); 

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


  //  handleSave
  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

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

    try {
  
      const updatedUser = await api.put(`/usuarios/${selectedUser.id}`, dataToSend);
      
      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ));

      alert(`Perfil de ${updatedUser.nombre} actualizado exitosamente.`);
      setSelectedUser(null);

    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al actualizar:', error);
        alert(`Hubo un error al guardar los cambios: ${error.message}`);
      }
    }
  };

  //  handleDelete
  const handleDelete = async (userId, userName) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${userName}?`)) {
      try {
        await api.delete(`/usuarios/${userId}`);
        
        setUsers(users.filter(user => user.id !== userId));
        alert('Usuario eliminado exitosamente.');

      } catch (error) {
        if (error instanceof AuthError) {
          handleAuthError(error.message);
        } else {
          console.error('Error al eliminar:', error);
          alert(`Hubo un error al eliminar el usuario: ${error.message}`);
        }
      }
    }
  };
  
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