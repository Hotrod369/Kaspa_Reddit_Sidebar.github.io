import axios from "axios";
import React, { useEffect, useState, } from "react";
import './App.css';
import IconRow from './IconRow';
import MyComponent from './kaspa-logo';
import ApexChart from "./kaspaChart";
import './styles';



export default function Demo() {
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);
  const [price, setPrice] = useState("");
  const [change, setChange] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [volume, setVolume] = useState("");
  const [hashrate, setHashrate] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [high24hr, setHigh24hr] = useState("");
  const [low24hr, setLow24hr] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hashrate data
        const responseData = await axios.get(
          'https://api.coingecko.com/api/v3/coins/kaspa'
        );
        const data = responseData.data;

        // Fetch Market Cap
        const market_Response = await axios.get(
          'https://api.kaspa.org/info/marketcap?stringOnly=false'
        );
        const cap = market_Response.data; 

        setMarketCap((cap.marketcap / 1 / 1e9).toFixed(2));
        setPrice(data.market_data.current_price.usd.toFixed(4));
        setChange(data.market_data.price_change_percentage_24h.toFixed(2));
        setVolume((data.market_data.total_volume.usd / 1000000).toFixed(2));

        const hashrateResponse = await fetch('https://api.kaspa.org/info/hashrate?stringOnly=false');
        const hashrateData = await hashrateResponse.json();
        const hashrateValue = hashrateData.hashrate;
        let hashrateFormatted;
        if (hashrateValue > 1) {
          hashrateFormatted = (hashrateValue / 1000).toFixed(2) + 'PH/s';
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

        const chartResponse = await axios.get('https://api.coingecko.com/api/v3/coins/kaspa/ohlc?vs_currency=usd&days=1&precision=5');
        if (!chartResponse.data || !Array.isArray(chartResponse.data)) {
          console.error('Invalid API response:', chartResponse.data);
          return;
        }
      
        const formattedChartData = chartResponse.data.map((item: number[]) => ({
          x: item[0],  // Assuming item[0] is the timestamp
          y: item[4],  // Assuming item[4] is the close price
        }))
        
        setChartData(formattedChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }

    fetchData();
  }, []);

  if (typeof window !== 'undefined') {
  return (
    <div className="app-container">
    <div className="content-container">
      {/* Other content */}
    </div>
    <div className="text-container">
      {/* Text content */}
      <IconRow />
      <div className="main-content">
        <MyComponent />
        {/* Other content */}
        <h3 className="kaspa-vision-title">
          <a>Kaspa Vision</a>
          <p>Kaspa: Building a Fast and Efficient Blockchain Based on Satoshi's Vision

            The vision behind this project is to build a Nakamoto-like service that operates as fast as internet speed allows. ...

            For Kaspa, we look to silver, which presented a different tradeoff vs. gold. In the original Aramaic text (Dahavavs. Kaspa), silver was historically treated as less precious than gold but more circulative, less valuable yet more acceptable as payment. ...

            The consensus stack of Kaspa is designed to address what we believe to be leading challenges for the second decade of crypto. ...

            Providing instant confirmation is not a trivial task, less of course one is willing to compromise on the principles of decentralization, or to operate under strong assumptions on the network’s topology and with minimal safety margins. ...

            Since transaction ordering is the main challenge of any consensus protocol, Kaspa’s base layer focuses on becoming a fast and scalable transaction sequencing (a.k.a. proof-of-publication) engine. ...

            In fact, a rollups-centric Ethereum will fragment the network, hinder composability, and dramatically change the underlying assumptions and dynamics. ...</p>
        </h3>
          <div className="chart-container">
            <ApexChart data={chartData} />
            {/* ... */}
          </div>
          <div className="price-info">
            <p>Price: {price} USD</p>
            <p>Change: {change}</p>
          </div>
          <div>
            <p>Market Cap: {marketCap}B$</p>
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
            <div className="root"></div>
              <div>
                {/* Your other JSX content */}
                <div className="et_pb_column et_pb_column_1_2 et_pb_column_8 et_pb_css_mix_blend_mode_passthrough et_pb_column_single">
                  <div className="et_pb_module et_pb_text et_pb_text_13 et_pb_text_align_left et_pb_bg_layout_dark">
                    <div className="et_pb_text_inner">
                      <h4 style={{ textAlign: 'center' }}>
                        <a href="https://kgi.kaspad.net" target="_blank" rel="noopener">
                          BlockDAG Visualizer
                        </a>
                      </h4>
                    </div>
                  </div>
                  <div className="et_pb_module et_pb_code et_pb_code_0" style={{ position: 'relative', width: '100%', height: '0', paddingTop: '56.25%' }}>
                    <div className="et_pb_code_inner" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
                      <iframe src="https://kgi.kaspad.net" width="100%" height="100%" title="Kaspa BlockDAG Visualizer"></iframe>
                    </div>
                  </div>
                  <div className="et_pb_module et_pb_text et_pb_text_14 et_pb_text_align_left et_pb_bg_layout_dark">
                    <h5 className="et_pb_text_inner">
                      <p style={{ textAlign: 'center', }}>
                        <a href="https://kgi.kaspad.net" target="_blank" rel="noopener">
                          Visualizer Website
                        </a>
                      </p>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}}