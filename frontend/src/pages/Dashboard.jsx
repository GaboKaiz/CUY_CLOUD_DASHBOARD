import { useState, useEffect } from 'react';
import axios from 'axios';
import ChartSelector from '../components/ChartSelector';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cuy_cloud')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));

        axios.get('http://localhost:5000/api/cuy_cloud/history')
            .then(response => setHistoryData(response.data))
            .catch(error => console.error('Error fetching history data:', error));
    }, []);

    const temperaturaData = {
        labels: historyData.map(item => new Date(item.fechahora).toLocaleTimeString()),
        values: historyData.map(item => item.temperatura_aire),
    };

    const humedadData = {
        labels: historyData.map(item => new Date(item.fechahora).toLocaleTimeString()),
        values: historyData.map(item => item.humedad_aire),
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <div className="text-gray-600">Dispositivos: {data.id_equipo || 'N/A'}</div>
                </div>
                <div className="flex space-x-2">
                    <input type="date" className="border rounded px-2 py-1" />
                    <input type="text" placeholder="Buscar..." className="border rounded px-2 py-1" />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ChartSelector data={temperaturaData} title="Temperatura Aire" />
                <ChartSelector data={humedadData} title="Humedad Aire" />
            </div>

            <div className="mb-6">
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
        </div>
    );
};

export default Dashboard;