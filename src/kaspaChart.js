import React from "react";
import ApexCharts from "react-apexcharts";
import './styles.css';
function ApexChart({ data }) {
    const [isChartDataAvailable, setIsChartDataAvailable] = React.useState(false);
    React.useEffect(() => {
        if (data.length > 0) {
            setIsChartDataAvailable(true);
        }
    }, [data]);
    if (isChartDataAvailable) {
        const historicalData = data.map((item) => ({
            x: item.x,
            y: item.y,
        }));
        const options = {
            series: [
                {
                    name: 'Price',
                    data: historicalData,
                },
            ],
            chart: {
                type: 'line',
                height: 500,
                width: 350,
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: {
                        colors: '#ffffff',
                    },
                },
            },
            yaxis: {
                forceNiceScale: true,
                labels: {
                    formatter: (val) => `$${val.toFixed(4)}`,
                    style: {
                        colors: '#ffffff',
                    },
                },
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy HH:mm:ss',
                    style: {
                        colors: '#000000',
                    },
                },
                y: {
                    formatter: (val) => `$${val.toFixed(4)}`,
                    style: {
                        colors: '#000000',
                    },
                },
            },
            fill: {
                colors: ['#3addbe'],
            },
        }; // Explicitly cast options to ApexOptions
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null, "Kaspa Price Chart"),
            React.createElement("div", { id: "kaspaChart" },
                React.createElement(ApexCharts, { options: options, series: options.series, type: "line", height: 400 }),
                " ")));
    }
    else {
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null, "Kaspa Price Chart"),
            React.createElement("p", null, "Loading chart data...")));
    }
}
export default ApexChart;
//# sourceMappingURL=kaspaChart.js.map