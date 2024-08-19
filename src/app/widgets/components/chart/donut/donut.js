import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';

if (typeof Highcharts === 'object') {
    Highcharts3D(Highcharts);
}

export default function Doughnut3DChart({ data }) {
    const [chartSize, setChartSize] = useState({ width: 200, height: 200 });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setChartSize({ width: 120, height: 120 });
            } else if (window.innerWidth <= 768) {
                setChartSize({ width: 150, height: 150 });
            }else if (window.innerWidth <= 1040) {
                setChartSize({ width: 160, height: 160 });
            } else {
                setChartSize({ width: 200, height: 200 });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getColor = (name) => {
        switch (name) {
            case 'Good':
                return '#28A745';
            case 'Bad':
                return '#B22222';
            case 'Repair':
                return '#FFA500';
            default:
                return '#212a31';
        }
    };

    const coloredData = data.map(item => ({
        ...item,
        color: getColor(item.name),
    }));

    const options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0,
            },
            backgroundColor: 'transparent',
            height: chartSize.height,
            width: chartSize.width,
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0],
        },
        plotOptions: {
            pie: {
                innerSize: '35%',
                depth: 15,
                shadow: false,
                size: '100%',
                dataLabels: {
                    enabled: false,
                },
                borderWidth: 0,
            }
        },
        title: {
            text: '',
        },
        series: [{
            type: 'pie',
            data: coloredData 
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}
