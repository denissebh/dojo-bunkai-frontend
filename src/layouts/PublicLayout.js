import React from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  // Este layout ahora solo se encarga de renderizar las páginas públicas
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default PublicLayout;