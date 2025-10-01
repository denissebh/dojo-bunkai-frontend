import React from 'react';

// Recibe una lista de pagos como props
function PagosView({ payments }) {
  if (!payments || payments.length === 0) {
    return <p>No hay registros de pagos disponibles.</p>;
  }

  // Mostramos el pago más reciente como ejemplo
  const ultimoPago = payments[0];

  return (
    <div>
      <h3>Mis Pagos</h3>
      <div className="payment-card">
        <div className="payment-card-header">
          <h4>{ultimoPago.concepto}</h4>
          <span>{ultimoPago.mes}</span>
        </div>
        <div className="payment-card-body">
          <p><strong>Fecha de Pago:</strong> {ultimoPago.fechaPago}</p>
          <p><strong>Fecha Máxima de Pago:</strong> {ultimoPago.fechaMaxima}</p>
          <p><strong>Método de Pago:</strong> {ultimoPago.metodo}</p>
        </div>
        <div className={`payment-card-footer status-${ultimoPago.estatus.toLowerCase()}`}>
          Estatus: {ultimoPago.estatus}
        </div>
      </div>
      {/* Aquí podrías mapear y mostrar más tarjetas de pago si quisieras */}
    </div>
  );
}

export default PagosView;