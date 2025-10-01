import React from 'react';
import { Outlet } from 'react-router-dom';

function PrivateLayout() {
  // Ya no necesitamos el div del escudo aquí
  return (
    <div className="private-layout">
      <Outlet />
    </div>
  );
}

export default PrivateLayout;