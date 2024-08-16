// Doughnut.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DoughnutChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#28A745',
                        '#FFA500',
                        '#B22222'
                    ],
                    borderColor: '#ffffff00',
                    borderJoinStyle: 'bevel',
                    hoverBorderJoinStyle: 'round',
                    hoverOffset: 10
                }]
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '80%', height: '80%' }}>
            <canvas ref={chartRef} ></canvas>
        </div>
    );
}
