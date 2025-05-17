import { useState } from 'react';
import { Line, Bar, Pie, Scatter, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

const ChartSelector = ({ data, title }) => {
    const [chartType, setChartType] = useState('line');

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: title,
                data: data.values,
                borderColor: chartType === 'pie' || chartType === 'doughnut' ? null : 'rgba(255, 99, 132, 1)',
                backgroundColor: chartType === 'pie' || chartType === 'doughnut' ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] : 'rgba(255, 99, 132, 0.2)',
                fill: chartType === 'area',
                pointRadius: chartType === 'line' || chartType === 'area' ? 5 : 3, // Tamaño de los puntos
                pointHoverRadius: chartType === 'line' || chartType === 'area' ? 7 : 5, // Tamaño al pasar el mouse
                showLine: chartType === 'line' ? false : chartType === 'area', // Desactiva líneas entre puntos en modo "line"
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: title },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const point = context.raw;
                        return `${context.dataset.label}: ${point.y} (${point.fechaHora})`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hora',
                },
            },
            y: {
                title: {
                    display: true,
                    text: title.includes('Temperatura') ? 'Temperatura (°C)' : 'Humedad (%)',
                },
            },
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
                return <Line data={chartData} options={options} />;
            case 'radar':
                return <Radar data={chartData} options={options} />;
            case 'doughnut':
                return <Doughnut data={chartData} options={options} />;
            default:
                return <Line data={chartData} options={options} />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-teal-800">{title}</h2>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="border border-teal-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="line">Puntos</option>
                    <option value="bar">Barras</option>
                    <option value="pie">Sandía (Pie)</option>
                    <option value="scatter">Dispersión</option>
                    <option value="area">Área</option>
                    <option value="radar">Radar</option>
                    <option value="doughnut">Doughnut</option>
                </select>
            </div>
            {renderChart()}
        </div>
    );
};

export default ChartSelector;