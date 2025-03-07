
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Index from './pages/Index';
import Facturas from './pages/Facturas';
import CargarFacturas from './pages/CargarFacturas';
import Pagos from './pages/Pagos';
import Conciliacion from './pages/Conciliacion';
import Informes from './pages/Informes';
import Contactos from './pages/Contactos';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Index />} />
        <Route path="facturas" element={<Facturas />} />
        <Route path="cargar-facturas" element={<CargarFacturas />} />
        <Route path="pagos" element={<Pagos />} />
        <Route path="conciliacion" element={<Conciliacion />} />
        <Route path="informes" element={<Informes />} />
        <Route path="contactos" element={<Contactos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
