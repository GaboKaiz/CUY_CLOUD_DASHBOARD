import FormInput from '../components/FormInput';

const DataEntry = () => {
    const handleDataAdded = () => {
        // Puedes agregar lógica aquí si necesitas refrescar algo después de agregar datos
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Ingresar Datos</h1>
            <FormInput onDataAdded={handleDataAdded} />
        </div>
    );
};

export default DataEntry;