import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import './styles.css';


export default function App() {
  const [price, setPrice] = useState('');
  const [change, setChange] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [volume, setVolume] = useState('');
  const [hashrate, setHashrate] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [high24hr, setHigh24hr] = useState('');
  const [low24hr, setLow24hr] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=5'
        );
        const data = response.data.kaspa;

        setPrice(data.usd.toFixed(4));
        setChange(`${data.usd_24h_change.toFixed(2)}%`);
        setMarketCap((data.usd_market_cap / 1000000).toFixed(2));
        setVolume((data.usd_24h_vol / 1000000).toFixed(2));

        const hashrateResponse = await fetch('https://api.kaspa.org/info/hashrate?stringOnly=false');
        const hashrateData = await hashrateResponse.json();
        const hashrateValue = hashrateData.hashrate;
        let hashrateFormatted;
        if (hashrateValue > 1000000000) {
          hashrateFormatted = (hashrateValue / 1000000000).toFixed(2) + 'PH/s';
        } else {
          hashrateFormatted = hashrateValue.toFixed(2) + 'TH/s';
        }
        setHashrate(hashrateFormatted);

        const difficultyResponse = await fetch('https://api.kaspa.org/info/network');
        const difficultyData = await difficultyResponse.json();
        const difficultyValue = difficultyData.difficulty;
        setDifficulty(difficultyValue.toFixed(2));

        const highLowResponse = await axios.get(
          'https://api.coingecko.com/api/v3/coins/kaspa?tickers=false&community_data=false&developer_data=false&sparkline=false'
        );
        const highLowData = highLowResponse.data.market_data;
        const highValue = highLowData.high_24h.usd.toFixed(5);
        const lowValue = highLowData.low_24h.usd.toFixed(5);
        setHigh24hr(highValue);
        setLow24hr(lowValue);

        const chartResponse = await axios.get(
          'https://api.coingecko.com/api/v3/coins/kaspa/market_chart?vs_currency=usd&days=1&interval=hourly&date_format=iso'
        );
        const chartData = chartResponse.data.prices.map((item: any[]) => ({ x: item[0], y: item[1] }));

        const options = {
          series: [
            {
              name: 'Price',
              data: chartData,
            },
          ],
          chart: {
            type: 'line',
            height: 400,
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
        };

        const chart = new ApexCharts(document.getElementById('kaspa-widget'), options);
        chart.render();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="widget">
      <h2>Kaspa Price Chart</h2>
      <div id="kaspa-widget"></div>
      <div>
        <p>Price: {price} USD</p>
        <p>Change: {change}</p>
      </div>
      <div>
        <p>Market Cap: {marketCap}M$</p>
        <p>24h Volume: {volume}M$</p>
      </div>
      <div>
        <p>Hashrate: {hashrate}</p>
        <p>Difficulty: {difficulty}</p>
      </div>
      <div>
        <p>24h High: {high24hr} USD</p>
        <p>24h Low: {low24hr} USD</p>
      </div>
    </div>
  );
}
