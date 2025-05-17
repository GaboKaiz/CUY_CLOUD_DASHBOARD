import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    fechahora: '',
    id_equipo: '',
    temperatura_aire: '',
    humedad_aire: '',
    temperatura_suelo: '',
    amoniaco: '',
    ventilacion: '',
    limpiarpoza: '',
    temperaturacontrolada: '',
    humedadcontrolada: '',
    suelohumedo: ''
  });

  // Datos simulados para los gráficos (puedes reemplazar con datos reales de la API)
  const temperaturaData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
    datasets: [
      {
        label: 'Temperatura Aire',
        data: [20, 22, 25, 23, 25],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const humedadData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
    datasets: [
      {
        label: 'Humedad Aire',
        data: [30, 35, 40, 38, 34],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  // Obtener datos de la API
  useEffect(() => {
    axios.get('http://localhost:5000/api/cuy_cloud')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Manejar el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/cuy_cloud', formData)
      .then(() => {
        alert('Datos insertados correctamente');
        // Refrescar datos
        axios.get('http://localhost:5000/api/cuy_cloud')
          .then(response => setData(response.data));
      })
      .catch(error => console.error('Error inserting data:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">CuyCloud Dashboard</h1>
        <div className="flex space-x-2">
          <input type="text" placeholder="Buscar..." className="border rounded px-2 py-1" />
          <input type="date" className="border rounded px-2 py-1" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráficos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Temperatura Aire</h2>
          <Line data={temperaturaData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Humedad Aire</h2>
          <Line data={humedadData} />
        </div>
      </div>

      {/* Valores promedio */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Valores Promedio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-lg font-semibold">Temp Aire</p>
            <p className="text-2xl">{data.temperatura_aire || 'N/A'}°</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-lg font-semibold">Humedad Aire</p>
            <p className="text-2xl">{data.humedad_aire || 'N/A'}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-lg font-semibold">Amoníaco</p>
            <p className="text-2xl">{data.amoniaco || 'N/A'}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-lg font-semibold">Humedad Suelo</p>
            <p className="text-2xl">{data.suelohumedo === 'SI' ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Formulario para insertar datos */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Ingresar Nuevos Datos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="datetime-local" name="fechahora" value={formData.fechahora} onChange={handleInputChange} className="border rounded px-2 py-1" />
          <input type="number" name="id_equipo" placeholder="ID Equipo" value={formData.id_equipo} onChange={handleInputChange} className="border rounded px-2 py-1" />
          <input type="number" name="temperatura_aire" placeholder="Temperatura Aire" value={formData.temperatura_aire} onChange={handleInputChange} className="border rounded px-2 py-1" />
          <input type="number" name="humedad_aire" placeholder="Humedad Aire" value={formData.humedad_aire} onChange={handleInputChange} className="border rounded px-2 py-1" />
          <input type="number" name="temperatura_suelo" placeholder="Temperatura Suelo" value={formData.temperatura_suelo} onChange={handleInputChange} className="border rounded px-2 py-1" />
          <input type="number" name="amoniaco" placeholder="Amoníaco" value={formData.amoniaco} onChange={handleInputChange} className="border rounded px-2 py-1" />
          <select name="ventilacion" value={formData.ventilacion} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Ventilación</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select name="limpiarpoza" value={formData.limpiarpoza} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Limpiar Poza</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select name="temperaturacontrolada" value={formData.temperaturacontrolada} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Temperatura Controlada</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select name="humedadcontrolada" value={formData.humedadcontrolada} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Humedad Controlada</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select name="suelohumedo" value={formData.suelohumedo} onChange={handleInputChange} className="border rounded px-2 py-1">
            <option value="">Suelo Húmedo</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
      </div>
    </div>
  );
};

export default App; 