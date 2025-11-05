import React, { useState, useEffect } from 'react';

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    id_usuario: '',
    monto: '',
    concepto: '',
    estatus_pago: 'Pendiente',
    fecha_vencimiento: '',
    tipo_pago: 'Efectivo'
  });

  // Función para cargar los pagos
  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/pagos');
      if (!response.ok) throw new Error('No se pudo obtener la lista de pagos.');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error al cargar pagos:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prevState => ({ ...prevState, [name]: value }));
  };

  // Maneja el envío del formulario para crear un nuevo pago
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment)
      });
      if (!response.ok) throw new Error('Error al crear el pago.');
      
      alert('Pago creado exitosamente.');
      setNewPayment({ id_usuario: '', monto: '', concepto: '', estatus_pago: 'Pendiente', fecha_vencimiento: '', tipo_pago: 'Efectivo' });
      fetchPayments(); 
    } catch (error) {
      console.error('Error al crear el pago:', error);
      alert('Hubo un error al crear el pago.');
    }
  };

  // Función para Marcar como Pagado
  const handleUpdateStatus = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/pagos/${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estatus_pago: 'Pagado' })
      });
      if (!response.ok) throw new Error('Error al actualizar el pago.');
      
      setPayments(payments.map(p => 
        p.id === paymentId ? { ...p, estatus_pago: 'Pagado' } : p
      ));
      alert('Pago marcado como Pagado.');
    } catch (error) {
      console.error('Error al actualizar pago:', error);
      alert('Hubo un error al actualizar el pago.');
    }
  };

  // Función para Eliminar Pago
  const handleDelete = async (paymentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro de pago?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/pagos/${paymentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar el pago.');

        setPayments(payments.filter(p => p.id !== paymentId));
        alert('Pago eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar pago:', error);
        alert('Hubo un error al eliminar el pago.');
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
          <input type="number" name="id_usuario" placeholder="ID del Alumno" value={newPayment.id_usuario} onChange={handleChange} required />
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