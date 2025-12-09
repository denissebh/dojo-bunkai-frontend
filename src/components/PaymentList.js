import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, AuthError } from '../services/api'; 

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]); // <--- 1. Estado para guardar alumnos
  
  const [newPayment, setNewPayment] = useState({
    id_usuario: '',
    monto: '',
    concepto: '',
    estatus_pago: 'Pendiente',
    fecha_vencimiento: '',
    tipo_pago: 'Efectivo'
  });

  const navigate = useNavigate();

  const handleAuthError = useCallback((errorMsg) => {
    console.error("Error de autenticación:", errorMsg);
    alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, [navigate]);

  // --- OBTENER PAGOS ---
  const fetchPayments = useCallback(async () => {
    try {
      const data = await api.get('/pagos');
      setPayments(data);
    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al cargar pagos:', error);
      }
    }
  }, [handleAuthError]); 

  // --- OBTENER ALUMNOS (NUEVO) ---
  const fetchStudents = useCallback(async () => {
    try {
      const data = await api.get('/usuarios'); // Reutilizamos tu ruta de usuarios
      // Filtramos para que solo aparezcan los Alumnos en la lista
      const onlyStudents = data.filter(user => user.rol === 'Alumno');
      setStudents(onlyStudents);
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchPayments();
    fetchStudents(); // <--- Llamamos a la función
  }, [fetchPayments, fetchStudents]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prevState => ({ ...prevState, [name]: value }));
  };

  //  handleSubmit (Crear Pago)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pagos', newPayment);
      
      alert('Pago creado exitosamente.');
      // Reseteamos el formulario
      setNewPayment({ id_usuario: '', monto: '', concepto: '', estatus_pago: 'Pendiente', fecha_vencimiento: '', tipo_pago: 'Efectivo' });
      fetchPayments(); 
    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al crear el pago:', error);
        alert(`Hubo un error al crear el pago: ${error.message}`);
      }
    }
  };

  //  handleUpdateStatus (Marcar como Pagado)
  const handleUpdateStatus = async (paymentId) => {
    try {
      const updatedPayment = await api.put(`/pagos/${paymentId}`, { 
        estatus_pago: 'Pagado' 
      });
      
      setPayments(payments.map(p => 
        p.id === paymentId ? { ...p, ...updatedPayment } : p
      ));
      alert('Pago marcado como Pagado.');
    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error.message);
      } else {
        console.error('Error al actualizar pago:', error);
        alert(`Hubo un error al actualizar el pago: ${error.message}`);
      }
    }
  };

  //  handleDelete (Eliminar Pago)
  const handleDelete = async (paymentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro de pago?')) {
      try {
        await api.delete(`/pagos/${paymentId}`);
        setPayments(payments.filter(p => p.id !== paymentId));
        alert('Pago eliminado exitosamente.');
      } catch (error) {
        if (error instanceof AuthError) {
          handleAuthError(error.message);
        } else {
          console.error('Error al eliminar pago:', error);
          alert(`Hubo un error al eliminar el pago: ${error.message}`);
        }
      }
    }
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'pagado': return 'status-paid';
      case 'pendiente': return 'status-pending';
      case 'vencido': return 'status-overdue';
      default: return '';
    }
  };
  
  const getTypeClass = (type) => {
    if (!type) return '';
    return `type-${type.toLowerCase()}`;
  }

  return (
    <div>
      <h3>Registrar un Pago Manual</h3>
      <form onSubmit={handleSubmit} className="contact-form admin-form">
        <div className="form-row">
          
          {/* --- AQUÍ ESTÁ EL CAMBIO PRINCIPAL: SELECT EN VEZ DE INPUT --- */}
          <select 
            name="id_usuario" 
            value={newPayment.id_usuario} 
            onChange={handleChange} 
            required
            className="form-select" // Puedes agregar estilos si quieres
          >
            <option value="">-- Seleccionar Alumno --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.nombre} {student.apellido_paterno} {student.apellido_materno || ''}
              </option>
            ))}
          </select>
          {/* ----------------------------------------------------------- */}

          <input type="number" name="monto" placeholder="Monto (ej. 500.00)" value={newPayment.monto} onChange={handleChange} required />
        </div>
        <input type="text" name="concepto" placeholder="Concepto (ej. Mensualidad Diciembre)" value={newPayment.concepto} onChange={handleChange} required />
        <div className="form-row">
          <input type="date" name="fecha_vencimiento" value={newPayment.fecha_vencimiento} onChange={handleChange} required />
          <select name="estatus_pago" value={newPayment.estatus_pago} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
          </select>
          <select name="tipo_pago" value={newPayment.tipo_pago} onChange={handleChange}>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registrar Pago</button>
      </form>

      <hr className="divider" />

      <h3>Historial de Pagos</h3>
      <div className="payment-table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Concepto</th>
              <th>Tipo de Pago</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
              <th>Acciones</th> 
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.studentname}</td>
                <td>{payment.concepto}</td>
                <td>
                  <span className={`payment-type-badge ${getTypeClass(payment.tipo_pago)}`}>
                    {payment.tipo_pago}
                  </span>
                </td>
                <td>{new Date(payment.fecha_vencimiento).toLocaleDateString()}</td>
                <td>
                  <span className={`status-dot ${getStatusClass(payment.estatus_pago)}`}></span>
                  {payment.estatus_pago}
                </td>
                <td>
                  <div className="action-buttons-cell">
                    {payment.estatus_pago !== 'Pagado' && (
                      <button onClick={() => handleUpdateStatus(payment.id)} className="btn-mark-paid">
                        Pagado
                      </button>
                    )}
                    <button onClick={() => handleDelete(payment.id)} className="btn-delete-payment">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p>No hay pagos registrados.</p>}
      </div>
    </div>
  );
}

export default PaymentList;