import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Renata Martínez', role: 'Alumno', grade: '4to Kyu', email: 'renata@email.com' },
  { id: 2, name: 'Damián Hernandez', role: 'Alumno', grade: '9no Kyu', email: 'damian@email.com' },
  { id: 3, name: 'Francisco Barroso de Luna', role: 'Profesor', grade: 'Kyoshi - Fundador', email: 'francisco@email.com' },
  { id: 4, name: 'Juan A, Maruri Jimenez', role: 'Profesor', grade: 'Sensei - 4to Dan', email: 'juan@email.com' },
];

function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };

  const handleCancel = () => {
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUsers(users.map(user => (user.id === selectedUser.id ? formData : user)));
    alert(`Perfil de ${formData.name} actualizado.`);
    setSelectedUser(null);
  };

  if (!selectedUser) {
    return (
      <div>
        <h3>Lista de Usuarios</h3>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-list-item">
              <div className="user-info">
                <strong>{user.name}</strong>
                <span>{user.role} - {user.grade}</span>
              </div>
              <button onClick={() => handleEditClick(user)} className="btn-edit">Editar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h3>Editando Perfil de: {selectedUser.name}</h3>
      <form onSubmit={handleSave} className="contact-form admin-form">
        <input type="text" name="name" placeholder="Nombre Completo" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} />
        <input type="text" name="grade" placeholder="Grado" value={formData.grade} onChange={handleChange} />
        <div className="form-row">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default UserManagement;