import { useState } from 'react';
import axios from 'axios';

const FormInput = ({ onDataAdded }) => {
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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/cuy_cloud', formData)
            .then(() => {
                alert('Datos insertados correctamente');
                onDataAdded();
                setFormData({
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
            })
            .catch(error => console.error('Error inserting data:', error));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
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
    );
};

export default FormInput;