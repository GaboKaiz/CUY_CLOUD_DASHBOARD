import { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cuy_cloud/history?limit=50')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Datos Registrados</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Fecha/Hora</th>
                        <th className="border px-4 py-2">ID Equipo</th>
                        <th className="border px-4 py-2">Temp Aire</th>
                        <th className="border px-4 py-2">Humedad Aire</th>
                        <th className="border px-4 py-2">Temp Suelo</th>
                        <th className="border px-4 py-2">Amoníaco</th>
                        <th className="border px-4 py-2">Ventilación</th>
                        <th className="border px-4 py-2">Limpiar Poza</th>
                        <th className="border px-4 py-2">Temp Controlada</th>
                        <th className="border px-4 py-2">Humedad Controlada</th>
                        <th className="border px-4 py-2">Suelo Húmedo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="border px-4 py-2">{new Date(item.fechahora).toLocaleString()}</td>
                            <td className="border px-4 py-2">{item.id_equipo}</td>
                            <td className="border px-4 py-2">{item.temperatura_aire}°</td>
                            <td className="border px-4 py-2">{item.humedad_aire}%</td>
                            <td className="border px-4 py-2">{item.temperatura_suelo}°</td>
                            <td className="border px-4 py-2">{item.amoniaco}%</td>
                            <td className="border px-4 py-2">{item.ventilacion}</td>
                            <td className="border px-4 py-2">{item.limpiarpoza}</td>
                            <td className="border px-4 py-2">{item.temperaturacontrolada}</td>
                            <td className="border px-4 py-2">{item.humedadcontrolada}</td>
                            <td className="border px-4 py-2">{item.suelohumedo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;