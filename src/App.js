import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import CalendarioPage from './pages/CalendarioPage';
import UbicacionPage from './pages/UbicacionPage';
import SobreNosotrosPage from './pages/SobreNosotrosPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfesorDashboardPage from './pages/ProfesorDashboardPage';
import AlumnoDashboardPage from './pages/AlumnoDashboardPage';
import AlumnoProfilePage from './pages/AlumnoProfilePage';
import OlvidePasswordPage from './pages/OlvidePasswordPage'; 
import NuevoPasswordPage from './pages/NuevoPasswordPage';

function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/olvide-password" element={<OlvidePasswordPage />} />
          <Route path="/reset-password/:token" element={<NuevoPasswordPage />} />
          <Route path="/calendario" element={<CalendarioPage />} />
          <Route path="/ubicacion" element={<UbicacionPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
        </Route>

        {/* Rutas Privadas */}
       {/* Rutas de Administrador */}
       <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          
        </Route>

        {/* Rutas de Profesor */}
        <Route element={<ProtectedRoute allowedRoles={['Profesor', 'Administrador']} />}>
          {/* Permitimos que el Admin también vea las rutas de Profesor */}
          <Route path="/profesor/dashboard" element={<ProfesorDashboardPage />} />
          <Route path="/profesor/alumno/:alumnoId" element={<AlumnoProfilePage />} />
        </Route>

        {/* Rutas de Alumno */}
        <Route element={<ProtectedRoute allowedRoles={['Alumno']} />}>
          <Route path="/alumno/dashboard" element={<AlumnoDashboardPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;