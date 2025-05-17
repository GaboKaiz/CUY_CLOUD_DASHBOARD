import { useState, useEffect } from 'react';
import axios from 'axios';

const FormInput = ({ onDataAdded, editData }) => {
    const [formData, setFormData] = useState({
        id: '',
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
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData(editData);
            setIsEditing(true);
        } else {
            setFormData({
                id: '',
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
            setIsEditing(false);
        }
    }, [editData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            axios.put(`http://localhost:5000/api/cuy_cloud/${formData.id}`, formData)
                .then(() => {
                    alert('Datos actualizados correctamente');
                    onDataAdded();
                    setIsEditing(false);
                })
                .catch(error => console.error('Error updating data:', error));
        } else {
            axios.post('http://localhost:5000/api/cuy_cloud', formData)
                .then(() => {
                    alert('Datos insertados correctamente');
                    onDataAdded();
                })
                .catch(error => console.error('Error inserting data:', error));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-teal-800 mb-6">{isEditing ? 'Editar Datos' : 'Ingresar Nuevos Datos'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isEditing && <input type="hidden" name="id" value={formData.id} />}
                <input type="datetime-local" name="fechahora" value={formData.fechahora} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <input type="number" name="id_equipo" placeholder="ID Equipo" value={formData.id_equipo} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <input type="number" name="temperatura_aire" placeholder="Temperatura Aire" value={formData.temperatura_aire} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <input type="number" name="humedad_aire" placeholder="Humedad Aire" value={formData.humedad_aire} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <input type="number" name="temperatura_suelo" placeholder="Temperatura Suelo" value={formData.temperatura_suelo} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <input type="number" name="amoniaco" placeholder="Amoníaco" value={formData.amoniaco} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <select name="ventilacion" value={formData.ventilacion} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Ventilación</option>
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                </select>
                <select name="limpiarpoza" value={formData.limpiarpoza} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Limpiar Poza</option>
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                </select>
                <select name="temperaturacontrolada" value={formData.temperaturacontrolada} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Temperatura Controlada</option>
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                </select>
                <select name="humedadcontrolada" value={formData.humedadcontrolada} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Humedad Controlada</option>
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                </select>
                <select name="suelohumedo" value={formData.suelohumedo} onChange={handleInputChange} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Suelo Húmedo</option>
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                </select>
            </div>
            <button onClick={handleSubmit} className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
        </div>
    );
};

export default FormInput;