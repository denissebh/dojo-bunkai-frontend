import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa los nuevos Layouts
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

// Importa todas tus páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import CalendarioPage from './pages/CalendarioPage';
import UbicacionPage from './pages/UbicacionPage';
import SobreNosotrosPage from './pages/SobreNosotrosPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfesorDashboardPage from './pages/ProfesorDashboardPage';
import AlumnoDashboardPage from './pages/AlumnoDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/calendario" element={<CalendarioPage />} />
          <Route path="/ubicacion" element={<UbicacionPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
        </Route>

        {/* --- RUTAS PRIVADAS --- */}
        <Route element={<PrivateLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/profesor/dashboard" element={<ProfesorDashboardPage />} />
          <Route path="/alumno/dashboard" element={<AlumnoDashboardPage />} />
          {/* Nota: La página de perfil de alumno vista por el profesor ya no es necesaria con esta estructura,
              pero si la necesitas, también iría aquí. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;