import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de Layout
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// Importa tus componentes de Página
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage'; 
import RenadePage from './components/RenadeSection';    
import CalendarioPage from './pages/CalendarioPage'; 
import UbicacionPage from './pages/UbicacionPage';   
import SobreNosotrosPage from './pages/SobreNosotrosPage'; 
import AdminDashboardPage from './pages/AdminDashboardPage';  
import ProfesorDashboardPage from './pages/ProfesorDashboardPage';    
import AlumnoDashboardPage from './pages/AlumnoDashboardPage'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/calendario" element={<CalendarioPage />} /> 
            <Route path="/ubicacion" element={<UbicacionPage />} />   
            <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} /> 
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/profesor/dashboard" element={<ProfesorDashboardPage />} />   
            <Route path="/alumno/dashboard" element={<AlumnoDashboardPage />} />        
          </Routes>        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;