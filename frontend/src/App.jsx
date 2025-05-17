import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import DataView from './pages/DataView';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Barra de navegación */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">CuyCloud</div>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Dashboard</Link>
              <Link to="/data-entry" className="hover:underline">Ingresar Datos</Link>
              <Link to="/data-view" className="hover:underline">Ver Datos</Link>
            </div>
          </div>
        </nav>

        {/* Rutas */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/data-view" element={<DataView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;