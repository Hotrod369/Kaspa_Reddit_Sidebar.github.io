import React from "react";
import ApexCharts from "react-apexcharts";
import './styles.css';

interface Props {
  data: { x: number; y: number }[];
}

function ApexChart({ data }: Props) {
  const [isChartDataAvailable, setIsChartDataAvailable] = React.useState(false);

  React.useEffect(() => {
    if (data.length > 0) {
      setIsChartDataAvailable(true);
    }
  }, [data]);

  if (isChartDataAvailable) {
    const historicalData = data.map((item: { x: number; y: number }) => ({
      x: item.x,
      y: item.y,
    }));

    const options: ApexCharts.ApexOptions = {
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
          formatter: (val: number) => `$${val.toFixed(4)}`,
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
          formatter: (val: number) => `$${val.toFixed(4)}`,
          style: {
            colors: '#000000',
          },
        },
      },
      fill: {
        colors: ['#3addbe'],
      },
    } as ApexCharts.ApexOptions; // Explicitly cast options to ApexOptions


    return (
      <>
        <h2>Kaspa Price Chart</h2>
        <div id="kaspaChart">
      <ApexCharts options={options} series={options.series} type="line" height={400} /> {/* Set the height directly here*/}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Kaspa Price Chart</h2>
        <p>Loading chart data...</p>
      </>
    );
  }
}

export default ApexChart;