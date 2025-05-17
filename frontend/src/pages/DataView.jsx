import { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';

const DataView = () => {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/api/cuy_cloud/history?limit=50')
            .then(response => setData(response.data || []))
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este registro?')) {
            axios.delete(`http://localhost:5000/api/cuy_cloud/${id}`)
                .then(() => {
                    setData(data.filter(item => item.id !== id));
                    alert('Registro eliminado correctamente');
                })
                .catch(error => console.error('Error deleting data:', error));
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
    };

    const handleDataAdded = () => {
        fetchData();
        setEditData(null);
    };

    return (
        <div className="p-6 bg-teal-50 min-h-screen">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">Ver Datos Registrados</h1>
            {editData && <FormInput onDataAdded={handleDataAdded} editData={editData} />}
            <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-teal-100">
                            <th className="border px-4 py-2 text-teal-800">Fecha/Hora</th>
                            <th className="border px-4 py-2 text-teal-800">ID Equipo</th>
                            <th className="border px-4 py-2 text-teal-800">Temp Aire</th>
                            <th className="border px-4 py-2 text-teal-800">Humedad Aire</th>
                            <th className="border px-4 py-2 text-teal-800">Temp Suelo</th>
                            <th className="border px-4 py-2 text-teal-800">Amoníaco</th>
                            <th className="border px-4 py-2 text-teal-800">Ventilación</th>
                            <th className="border px-4 py-2 text-teal-800">Limpiar Poza</th>
                            <th className="border px-4 py-2 text-teal-800">Temp Controlada</th>
                            <th className="border px-4 py-2 text-teal-800">Humedad Controlada</th>
                            <th className="border px-4 py-2 text-teal-800">Suelo Húmedo</th>
                            <th className="border px-4 py-2 text-teal-800">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}>
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
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600">Editar</button>
                                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataView;