import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout'; 


const useAuth = () => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    return { isAuthenticated: true, user: JSON.parse(userDataString) };
  }
  return { isAuthenticated: false, user: null };
};

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  // --- REGLA 1: ¿Está logueado? ---
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // --- REGLA 2: ¿Tiene el rol correcto? ---
  const isAllowed = allowedRoles.includes(user.rol);

  if (!isAllowed) {

    let homePath = '/'; 
    if (user.rol === 'Alumno') homePath = '/alumno/dashboard';
    if (user.rol === 'Profesor') homePath = '/profesor/dashboard';
    if (user.rol === 'Administrador') homePath = '/admin/dashboard';
    
    return <Navigate to={homePath} replace />;
  }

  
  // Está logueado Y tiene el rol correcto.
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
}

export default ProtectedRoute;