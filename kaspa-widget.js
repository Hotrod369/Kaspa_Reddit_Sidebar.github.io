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
            color: '#fff',
            background: '#00E396'
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
            color: '#fff',
            background: '#00E396'
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
    
        // Add 24h high and low
    const response3 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/kaspa?tickers=false&community_data=false&developer_data=false&sparkline=false"
    );
    const data3 = response3.data.market_data;
    const high24h = data3.high_24h.usd.toFixed(5);
    const low24h = data3.low_24h.usd.toFixed(5);

    // Create elements for 24h high and low and append to widget
    const high24hElement = document.createElement("p");
    high24hElement.textContent = `24h High: ${high24h} USD`;
    kaspaWidget.appendChild(high24hElement);
    high24hElement.style.margin = '0';

    const low24hElement = document.createElement("p");
    low24hElement.textContent = `24h Low: ${low24h} USD`;
    kaspaWidget.appendChild(low24hElement);
    low24hElement.style.margin = '10';
    
    const priceContainer = document.createElement("div");
    priceContainer.className = "price-container";
    priceContainer.appendChild(high24hElement);
    priceContainer.appendChild(low24hElement);
    kaspaWidget.appendChild(priceContainer);
    
    // Set CSS styles for widget container
    kaspaWidget.style.backgroundColor = "#1b1b1b";
    kaspaWidget.style.color = "#ffffff";
    kaspaWidget.style.padding = "15px";
    kaspaWidget.style.borderRadius = "10px";

    // Set CSS styles for chart
    ApexCharts.exec(chart.options.chart.id, "updateOptions", {
      chart: {
        foreColor: "#ffffff",
      },
      xaxis: {
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
    });
    
    chart.render();

  } catch (error) {
    console.error(error);
  }
};

fetchData();
