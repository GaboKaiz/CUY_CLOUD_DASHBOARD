import { useState, useEffect } from 'react';
import axios from 'axios';
import ChartSelector from '../components/ChartSelector';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [historyData, setHistoryData] = useState([]);
    const [filteredHistoryData, setFilteredHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/api/cuy_cloud')
            .then(response => {
                setData(response.data || {});
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });

        fetchHistoryData();
    }, []);

    const fetchHistoryData = (date = '') => {
        let url = 'http://localhost:5000/api/cuy_cloud/history?limit=50';
        if (date) {
            url += `&fechahora=${date}`;
        }
        axios.get(url)
            .then(response => {
                const fetchedData = response.data || [];
                setHistoryData(fetchedData);
                setFilteredHistoryData(fetchedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching history data:', error);
                setLoading(false);
            });
    };

    const handleSearch = () => {
        fetchHistoryData(selectedDate);
    };

    // Datos para las gráficas, incluyendo fecha y hora completas para el tooltip
    const temperaturaData = {
        labels: filteredHistoryData.map(item => new Date(item.fechahora).toLocaleTimeString()),
        values: filteredHistoryData.map(item => ({
            x: new Date(item.fechahora).toLocaleTimeString(),
            y: item.temperatura_aire || 0,
            fechaHora: new Date(item.fechahora).toLocaleString(), // Para el tooltip
        })),
    };

    const humedadData = {
        labels: filteredHistoryData.map(item => new Date(item.fechahora).toLocaleTimeString()),
        values: filteredHistoryData.map(item => ({
            x: new Date(item.fechahora).toLocaleTimeString(),
            y: item.humedad_aire || 0,
            fechaHora: new Date(item.fechahora).toLocaleString(), // Para el tooltip
        })),
    };

    if (loading) return <div className="text-center text-teal-700 text-xl">Cargando...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-50 p-6">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                    <h1 className="text-3xl font-bold text-teal-800">CuyCloud</h1>
                </div>
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Buscar
                    </button>
                </div>
            </header>

            <div className="flex">
                <aside className="w-1/5 bg-white p-4 rounded-xl shadow-lg mr-6">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Dispositivos</h3>
                    <ul>
                        <li className="text-gray-600">0001</li>
                        <li className="text-gray-600">0002</li>
                        <li className="text-gray-600">0003</li>
                    </ul>
                </aside>

                <main className="w-4/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <ChartSelector
                                data={temperaturaData}
                                title={`Temperatura del Aire (${selectedDate || 'Todas las fechas'})`}
                            />
                            <p className="text-sm text-gray-600 mt-2">Muestra la temperatura del aire registrada en el tiempo para la fecha seleccionada.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <ChartSelector
                                data={humedadData}
                                title={`Humedad del Aire (${selectedDate || 'Todas las fechas'})`}
                            />
                            <p className="text-sm text-gray-600 mt-2">Muestra el porcentaje de humedad del aire registrado en el tiempo para la fecha seleccionada.</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-teal-800 mb-6">Últimos Valores Promedio</h2>
                        <p className="text-sm text-gray-600 mb-4">Estos son los valores más recientes registrados en el sistema:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex items-center justify-center bg-teal-50 p-4 rounded-full text-center">
                                <span className="text-3xl font-bold text-teal-900">{data.temperatura_aire || 'N/A'}°</span>
                                <span className="ml-2 text-teal-700">Temp Aire</span>
                            </div>
                            <div className="flex items-center justify-center bg-teal-50 p-4 rounded-full text-center">
                                <span className="text-3xl font-bold text-teal-900">{data.humedad_aire || 'N/A'}%</span>
                                <span className="ml-2 text-teal-700">Humedad Aire</span>
                            </div>
                            <div className="flex items-center justify-center bg-teal-50 p-4 rounded-full text-center">
                                <span className="text-3xl font-bold text-teal-900">{data.amoniaco || 'N/A'}%</span>
                                <span className="ml-2 text-teal-700">Amoníaco</span>
                            </div>
                            <div className="flex items-center justify-center bg-teal-50 p-4 rounded-full text-center">
                                <span className="text-3xl font-bold text-teal-900">{data.suelohumedo === 'SI' ? 'Sí' : 'No'}</span>
                                <span className="ml-2 text-teal-700">Humedad Suelo</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;