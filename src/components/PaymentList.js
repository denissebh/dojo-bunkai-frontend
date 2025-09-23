import React from 'react';

function PaymentList({ payments }) {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pagado':
        return 'status-paid';
      case 'pendiente':
        return 'status-pending';
      case 'vencido':
        return 'status-overdue';
      default:
        return '';
    }
  };

  return (
    <div className="payment-table-container">
      <h3>Calendario de Pagos</h3>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Concepto</th>
            <th>Fecha de Vencimiento</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.studentName}</td>
              <td>{payment.concept}</td>
              <td>{payment.dueDate}</td>
              <td>
                <span className={`status-dot ${getStatusClass(payment.status)}`}></span>
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;