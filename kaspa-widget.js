const kaspaWidget = document.getElementById("kaspa-widget");

const fetchData = async () => {
  try {
    // Fetch current price, market cap, volume, and 24h change data
    const response1 = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=5"
    );
    const data1 = response1.data.kaspa;

    // Fetch hourly market chart data for the last day
    const response2 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/kaspa/market_chart?vs_currency=usd&days=1&interval=hourly&date_format=iso"
    );
    const data2 = response2.data.prices;

    // Extract data points for chart and create options object
    const chartData = data2.map((item) => [item[0], item[1]]);
    const options = {
      series: [
        {
          name: "Price",
          data: chartData,
        },
      ],
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        colors: "#3addbe",
      },
    };

    // Render chart using ApexCharts library
    const chart = new ApexCharts(kaspaWidget, options);
    chart.render();

    // Extract and format data points for current price, market cap, and volume
    const price = data1.usd.toFixed(5);
    const marketCap = data1.usd_market_cap.toFixed(2);
    const volume = data1.usd_24h_vol.toFixed(2);
    const change = data1.usd_24h_change.toFixed(2);
    const updatedAt = new Date(data1.last_updated_at * 1000).toLocaleString();

    // Create elements for each data point and append to widget
    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${price} USD`;
    widget.appendChild(priceElement);

    const marketCapElement = document.createElement("p");
    marketCapElement.textContent = `Market Cap: ${marketCap} USD`;
    widget.appendChild(marketCapElement);

    const volumeElement = document.createElement("p");
    volumeElement.textContent = `24h Volume: ${volume} USD`;
    widget.appendChild(volumeElement);

  } catch (error) {
    console.error(error);
  }
};

fetchData();
