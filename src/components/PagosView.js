import React from 'react';


function PagosView({ payments }) {
  if (!payments || payments.length === 0) {
    return <p>No hay registros de pagos disponibles.</p>;
  }

  const ultimoPago = payments[0];


  const estatusClase = (ultimoPago.estatus_pago || 'pendiente').toLowerCase();
  const estatusDisplay = ultimoPago.estatus_pago || 'Pendiente';

  const conceptoDisplay = ultimoPago.concepto || 'Pago no especificado';
  const mesDisplay = ultimoPago.mes || ''; 
  const fechaPagoDisplay = ultimoPago.fecha_pago ? new Date(ultimoPago.fecha_pago).toLocaleDateString('es-MX') : 'N/A';
  const fechaMaximaDisplay = ultimoPago.fecha_vencimiento ? new Date(ultimoPago.fecha_vencimiento).toLocaleDateString('es-MX') : 'N/A';
  const metodoDisplay = ultimoPago.tipo_pago || 'N/A';


  return (
    <div>
      <h3>Mis Pagos</h3>
      <div className="payment-card">
        <div className="payment-card-header">
          <h4>{conceptoDisplay}</h4>
          <span>{mesDisplay}</span>
        </div>
        <div className="payment-card-body">
          <p><strong>Fecha de Pago:</strong> {fechaPagoDisplay}</p>
          <p><strong>Fecha Máxima de Pago:</strong> {fechaMaximaDisplay}</p>
          <p><strong>Método de Pago:</strong> {metodoDisplay}</p>
        </div>
        <div className={`payment-card-footer status-${estatusClase}`}>
          Estatus: {estatusDisplay}
        </div>
      </div>
      {/* Aquí podríamos mapear y mostrar *todos* los pagos, no solo el último.
        Ej: payments.map(pago => ( ...código de la tarjeta... ))
      */}
    </div>
  );
}

export default PagosView;
