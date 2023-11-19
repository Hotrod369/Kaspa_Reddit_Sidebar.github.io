import axios from "axios";
import React, { useEffect, useState, } from "react";
import './App.css';
import IconRow from './IconRow';
import MyComponent from './kaspa-logo';
import ApexChart from "./kaspaChart";
import './styles';
export default function Demo() {
    const [chartData, setChartData] = useState([]);
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
                const responseData = await axios.get('https://api.coingecko.com/api/v3/coins/kaspa');
                const data = responseData.data;
                // Fetch Market Cap
                const market_Response = await axios.get('https://api.kaspa.org/info/marketcap?stringOnly=false');
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
                }
                else {
                    hashrateFormatted = hashrateValue.toFixed(2) + 'TH/s';
                }
                setHashrate(hashrateFormatted);
                const difficultyResponse = await fetch('https://api.kaspa.org/info/network');
                const difficultyData = await difficultyResponse.json();
                const difficultyValue = difficultyData.difficulty;
                setDifficulty(difficultyValue.toFixed(2));
                const highLowResponse = await axios.get('https://api.coingecko.com/api/v3/coins/kaspa?tickers=false&community_data=false&developer_data=false&sparkline=false');
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
                const formattedChartData = chartResponse.data.map((item) => ({
                    x: item[0],
                    y: item[4], // Assuming item[4] is the close price
                }));
                setChartData(formattedChartData);
            }
            catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };
        fetchData();
    }, []);
    if (typeof window !== 'undefined') {
        return (React.createElement("div", { className: "app-container" },
            React.createElement("div", { className: "content-container" }),
            React.createElement("div", { className: "text-container" },
                React.createElement(IconRow, null),
                React.createElement("div", { className: "main-content" },
                    React.createElement(MyComponent, null),
                    React.createElement("h3", { className: "kaspa-vision-title" },
                        React.createElement("a", null, "Kaspa Vision"),
                        React.createElement("p", null, "Kaspa: Building a Fast and Efficient Blockchain Based on Satoshi's Vision The vision behind this project is to build a Nakamoto-like service that operates as fast as internet speed allows. ... For Kaspa, we look to silver, which presented a different tradeoff vs. gold. In the original Aramaic text (Dahavavs. Kaspa), silver was historically treated as less precious than gold but more circulative, less valuable yet more acceptable as payment. ... The consensus stack of Kaspa is designed to address what we believe to be leading challenges for the second decade of crypto. ... Providing instant confirmation is not a trivial task, less of course one is willing to compromise on the principles of decentralization, or to operate under strong assumptions on the network\u2019s topology and with minimal safety margins. ... Since transaction ordering is the main challenge of any consensus protocol, Kaspa\u2019s base layer focuses on becoming a fast and scalable transaction sequencing (a.k.a. proof-of-publication) engine. ... In fact, a rollups-centric Ethereum will fragment the network, hinder composability, and dramatically change the underlying assumptions and dynamics. ...")),
                    React.createElement("div", { className: "chart-container" },
                        React.createElement(ApexChart, { data: chartData })),
                    React.createElement("div", { className: "price-info" },
                        React.createElement("p", null,
                            "Price: ",
                            price,
                            " USD"),
                        React.createElement("p", null,
                            "Change: ",
                            change)),
                    React.createElement("div", null,
                        React.createElement("p", null,
                            "Market Cap: ",
                            marketCap,
                            "B$"),
                        React.createElement("p", null,
                            "24h Volume: ",
                            volume,
                            "M$")),
                    React.createElement("div", null,
                        React.createElement("p", null,
                            "Hashrate: ",
                            hashrate),
                        React.createElement("p", null,
                            "Difficulty: ",
                            difficulty)),
                    React.createElement("div", null,
                        React.createElement("p", null,
                            "24h High: ",
                            high24hr,
                            " USD"),
                        React.createElement("p", null,
                            "24h Low: ",
                            low24hr,
                            " USD")),
                    React.createElement("div", { className: "root" }),
                    React.createElement("div", null,
                        React.createElement("div", { className: "et_pb_column et_pb_column_1_2 et_pb_column_8 et_pb_css_mix_blend_mode_passthrough et_pb_column_single" },
                            React.createElement("div", { className: "et_pb_module et_pb_text et_pb_text_13 et_pb_text_align_left et_pb_bg_layout_dark" },
                                React.createElement("div", { className: "et_pb_text_inner" },
                                    React.createElement("h4", { style: { textAlign: 'center' } },
                                        React.createElement("a", { href: "https://kgi.kaspad.net", target: "_blank", rel: "noopener" }, "BlockDAG Visualizer")))),
                            React.createElement("div", { className: "et_pb_module et_pb_code et_pb_code_0", style: { position: 'relative', width: '100%', height: '0', paddingTop: '56.25%' } },
                                React.createElement("div", { className: "et_pb_code_inner", style: { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' } },
                                    React.createElement("iframe", { src: "https://kgi.kaspad.net", width: "100%", height: "100%", title: "Kaspa BlockDAG Visualizer" }))),
                            React.createElement("div", { className: "et_pb_module et_pb_text et_pb_text_14 et_pb_text_align_left et_pb_bg_layout_dark" },
                                React.createElement("h5", { className: "et_pb_text_inner" },
                                    React.createElement("p", { style: { textAlign: 'center', } },
                                        React.createElement("a", { href: "https://kgi.kaspad.net", target: "_blank", rel: "noopener" }, "Visualizer Website"))))))))));
    }
}
//# sourceMappingURL=Demo.js.map