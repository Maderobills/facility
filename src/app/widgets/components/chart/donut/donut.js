import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';

if (typeof Highcharts === 'object') {
    Highcharts3D(Highcharts);
}

export default function Doughnut3DChart({ data }) {
    const options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 30,
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
                innerSize: '30%',
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
            data: data
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}
