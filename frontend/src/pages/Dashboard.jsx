import { useState, useEffect } from 'react';
import axios from 'axios';
import ChartSelector from '../components/ChartSelector';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

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

        axios.get('http://localhost:5000/api/cuy_cloud/history')
            .then(response => {
                setHistoryData(response.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching history data:', error);
                setLoading(false);
            });
    }, []);

    const temperaturaData = {
        labels: historyData.map(item => new Date(item.fechahora).toLocaleTimeString()),
        values: historyData.map(item => item.temperatura_aire || 0),
    };

    const humedadData = {
        labels: historyData.map(item => new Date(item.fechahora).toLocaleTimeString()),
        values: historyData.map(item => item.humedad_aire || 0),
    };

    if (loading) return <div className="text-center text-gray-700 text-xl">Cargando...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-50 p-6">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-6">
                    <h1 className="text-4xl font-bold text-teal-800">CuyCloud Dashboard</h1>
                    <div className="text-lg text-gray-600">Dispositivos: {data.id_equipo || 'N/A'}</div>
                </div>
                <div className="flex space-x-4">
                    <input type="date" className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="text" placeholder="Buscar..." className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <ChartSelector data={temperaturaData} title="Temperatura Aire" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <ChartSelector data={humedadData} title="Humedad Aire" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-teal-800 mb-6">Valores Promedio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-teal-50 p-4 rounded-lg text-center hover:bg-teal-100 transition-colors">
                        <p className="text-lg font-medium text-teal-700">Temp Aire</p>
                        <p className="text-3xl font-bold text-teal-900">{data.temperatura_aire || 'N/A'}°</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg text-center hover:bg-teal-100 transition-colors">
                        <p className="text-lg font-medium text-teal-700">Humedad Aire</p>
                        <p className="text-3xl font-bold text-teal-900">{data.humedad_aire || 'N/A'}%</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg text-center hover:bg-teal-100 transition-colors">
                        <p className="text-lg font-medium text-teal-700">Amoníaco</p>
                        <p className="text-3xl font-bold text-teal-900">{data.amoniaco || 'N/A'}%</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg text-center hover:bg-teal-100 transition-colors">
                        <p className="text-lg font-medium text-teal-700">Humedad Suelo</p>
                        <p className="text-3xl font-bold text-teal-900">{data.suelohumedo === 'SI' ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;