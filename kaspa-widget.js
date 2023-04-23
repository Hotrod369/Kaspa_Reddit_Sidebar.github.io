const kaspaWidget = document.getElementById("kaspa-widget");

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=5"
    );
    const data = response.data.kaspa;

    const price = data.usd;
    const marketCap = data.usd_market_cap;
    const volume = data.usd_24h_vol;
    const change = data.usd_24h_change;
    const updatedAt = new Date(data.last_updated_at * 1000).toLocaleString();

    const options = {
      series: [
        {
          name: "Price",
          data: [
            [Date.now() - 86400000, data.usd_24h_change],
            [Date.now(), data.usd],
          ],
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

    const chart = new ApexCharts(kaspaWidget, options);
    chart.render();

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${price.toFixed(5)} USD`;

    const marketCapElement = document.createElement("p");
    marketCapElement.textContent = `Market Cap: ${marketCap.toFixed(2)} USD`;

    const volumeElement = document.createElement("p");
    volumeElement.textContent = `24h Volume: ${volume.toFixed(2)} USD`;

    // Append volume element to widget
    widget.appendChild(volumeElement);

  } catch (error) {
    console.error(error);
  }
};

fetchData();
