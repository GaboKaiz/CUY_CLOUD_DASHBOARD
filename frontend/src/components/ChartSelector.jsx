import { useState } from 'react';
import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const ChartSelector = ({ data, title }) => {
    const [chartType, setChartType] = useState('line');

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: title,
                data: data.values,
                borderColor: chartType === 'pie' ? null : 'rgba(255, 99, 132, 1)',
                backgroundColor: chartType === 'pie' ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] : 'rgba(255, 99, 132, 0.2)',
                fill: chartType === 'area', // Habilita el relleno para el gráfico de área
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: title },
        },
    };

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return <Line data={chartData} options={options} />;
            case 'bar':
                return <Bar data={chartData} options={options} />;
            case 'pie':
                return <Pie data={chartData} options={options} />;
            case 'scatter':
                return <Scatter data={chartData} options={options} />;
            case 'area':
                return <Line data={chartData} options={options} />; // Usa Line con fill: true para área
            default:
                return <Line data={chartData} options={options} />;
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="border rounded px-2 py-1">
                    <option value="line">Línea</option>
                    <option value="bar">Barras</option>
                    <option value="pie">Sandía (Pie)</option>
                    <option value="scatter">Dispersión</option>
                    <option value="area">Área</option>
                </select>
            </div>
            {renderChart()}
        </div>
    );
};

export default ChartSelector;