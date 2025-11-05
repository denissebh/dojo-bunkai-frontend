import React from 'react';
import { Outlet } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import PrivateFooter from './PrivateFooter';

function PrivateLayout() {
  return (
    <div className="private-layout">
      <PrivateHeader title="Bienvenido a Dojo Bunkai" />
      <main>
        <Outlet />
      </main>
      <PrivateFooter />
    </div>
  );
}
export default PrivateLayout;