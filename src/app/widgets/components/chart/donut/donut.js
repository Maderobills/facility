import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';

if (typeof Highcharts === 'object') {
    Highcharts3D(Highcharts);
}

export default function Doughnut3DChart({ data }) {
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

    // Map data to include colors based on the item name
    const coloredData = data.map(item => ({
        ...item,
        color: getColor(item.name),
    }));

    const options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 65,
                beta: 0,
            },
            backgroundColor: 'transparent',
            height: 200,
            width: 200, 
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0],
        },
        plotOptions: {
            pie: {
                innerSize: '35%',
                depth: 20,
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
            data: coloredData // Use the data with colors
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}
