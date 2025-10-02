import React from 'react';
import { Outlet } from 'react-router-dom';

function PrivateLayout() {
  
  return (
    <div className="private-layout">
      <Outlet />
    </div>
  );
}

export default PrivateLayout;