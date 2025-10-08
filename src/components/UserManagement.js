import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/usuarios');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de usuarios.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        alert('No se pudo cargar la lista de usuarios.');
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };

  const handleCancel = () => { setSelectedUser(null); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // --- FUNCIÓN handleSave (PARA GUARDAR CAMBIOS) ---
  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios.');
      }

      const updatedUser = await response.json();

      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      
      alert(`Perfil de ${updatedUser.nombre} actualizado exitosamente.`);
      setSelectedUser(null);

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Hubo un error al guardar los cambios.');
    }
  };

  // --- FUNCIÓN handleDelete (PARA ELIMINAR USUARIOS) ---
  const handleDelete = async (userId, userName) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${userName}?`)) {
      try {
        const response = await fetch(`http://localhost:4000/api/usuarios/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
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