import React from 'react';
const pendingPayments = [
    { id: 102, studentName: 'Damián Hernandez', concept: 'Mensualidad Octubre', type: 'Transferencia'},
    { id: 105, studentName: 'Daniel Trujillo', concept: 'Mensualidad Octubre', type: 'Transferencia'},
];

function PaymentValidationView() {
  return (
    <div>
      <h3>Pagos por Validar (Transferencias)</h3>
      <ul className="info-list">
        {pendingPayments.map(payment => (
          <li key={payment.id} className='user-list-item'>
            <div className="user-info">
              <strong>{payment.studentName}</strong>
              <span>Concepto: {payment.concept}</span>
            </div>
            <button className="asistencia-btn presente">Confirmar Pago</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PaymentValidationView;