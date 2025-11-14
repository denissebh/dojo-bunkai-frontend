import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { api, AuthError } from '../services/api'; 

function UserManagement() {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('Alumnos'); // Estado para la pestaña activa
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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const dataToSend = {
      ...selectedUser,
      ...formData,
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

  // --- Filtrar Usuarios por Rol ---
  const students = users.filter(u => u.rol === 'Alumno');
  const professors = users.filter(u => u.rol === 'Profesor' || u.rol === 'Administrador');

  // --- Función Auxiliar para Renderizar la Lista ---
  const renderUserList = (userList) => {
    if (userList.length === 0) {
      return <p style={{ padding: '20px', color: '#666' }}>No hay usuarios en esta categoría.</p>;
    }

    return (
      <ul className="user-list">
        {userList.map(user => (
          <li key={user.id} className="user-list-item">
            <div className="user-info">
              <strong>{user.nombre} {user.apellido_paterno} {user.apellido_materno}</strong>
              <span className="user-role-badge">{user.rol}</span>
              <span style={{ fontSize: '0.9em', color: '#666' }}>
                 {user.grado ? ` - ${user.grado}` : ''} | {user.correo_electronico}
              </span>
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
    );
  };
  
  // --- VISTA DE EDICIÓN  ---
  if (selectedUser) {
    return (
      <div>
        <h3>Editando Perfil de: {selectedUser.nombre}</h3>
        <form onSubmit={handleSave} className="contact-form admin-form">
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
          <input type="text" name="apellido_paterno" placeholder="Apellido Paterno" value={formData.apellido_paterno} onChange={handleChange} />
          <input type="text" name="apellido_materno" placeholder="Apellido Materno" value={formData.apellido_materno} onChange={handleChange} />
          <input type="email" name="correo_electronico" placeholder="Correo Electrónico" value={formData.correo_electronico} onChange={handleChange} />
          <input type="text" name="grado" placeholder="Grado" value={formData.grado} onChange={handleChange} />
          <input type="text" name="curp" placeholder="CURP" value={formData.curp} onChange={handleChange} />
          <div className="form-row">
            <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    );
  }

  // --- VISTA PRINCIPAL CON PESTAÑAS ---
  return (
    <div>
      <h3>Gestión de Usuarios</h3>
      
      {/* Contenedor de Pestañas */}
      <div className="tabs-container" style={{ marginBottom: '20px', borderBottom: '2px solid #eee' }}>
        <button 
          onClick={() => setActiveTab('Alumnos')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'Alumnos' ? '3px solid #D32F2F' : 'none',
            fontWeight: activeTab === 'Alumnos' ? 'bold' : 'normal',
            color: activeTab === 'Alumnos' ? '#D32F2F' : '#666',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Alumnos ({students.length})
        </button>
        <button 
          onClick={() => setActiveTab('Profesores')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'Profesores' ? '3px solid #D32F2F' : 'none',
            fontWeight: activeTab === 'Profesores' ? 'bold' : 'normal',
            color: activeTab === 'Profesores' ? '#D32F2F' : '#666',
            cursor: 'pointer',
            fontSize: '16px',
            marginLeft: '10px'
          }}
        >
          Profesores ({professors.length})
        </button>
      </div>
      {activeTab === 'Alumnos' ? renderUserList(students) : renderUserList(professors)}
      
    </div>
  );
}

export default UserManagement;