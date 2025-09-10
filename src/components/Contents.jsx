import { useState, useEffect } from "react";

import "./../styles/Contents.css"

function format(price, quote) {
    if (typeof price !== "string") 
        price = String(price);
    return price.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0*$/, "") + " " + quote;
}

function Row( {asset, onDelete} ) {
    const [price, setPrice] = useState(null);
    const [change, setChange] = useState("");
    const [quote, setQuote] = useState("");
    useEffect(() => {
        if (!asset) return;
        const fetchPrice = () => {
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${asset}`)
                .then(response => response.json())
                .then(data => {
                    const price = data.price;
                    setPrice(price);
                })
                .catch(() => setPrice(null));
        };
        fetchPrice();
        const id = setInterval(fetchPrice, 5000);
        return () => clearInterval(id); 
    }, [asset]);
    useEffect(() => {
        if (!asset) return;
        const fetch24Change = () => {
            fetch(`https://api.binance.com/api/v3/ticker?symbol=${asset}`)
                .then(response => response.json())
                .then(data => {
                    const value = data.priceChangePercent;
                    let sign = "";
                    if (value >= 0) {sign = "+"}
                    setChange(`${sign}${value}%`);
                })
                .catch((error) => setChange(null));
        }
        fetch24Change();
        const cid = setInterval(fetch24Change, 5000);
        return () => clearInterval(cid);
    }, [asset]);
    useEffect(() => {
        if (!asset) return;
        const fetchQuote = () => {
            fetch(`https://api.binance.com/api/v3/exchangeInfo?symbol=${asset}`)
                .then(response => response.json())
                .then(data => {
                    setQuote(data.symbols[0].quoteAsset);
                })
                .catch(() => setQuote(null));
        }
        fetchQuote();
    }, [asset]);
    return (
        <div className="asset-block">
            <div className="left-column">
                <div className="asset-name">
                    {asset}
                </div>
                <div className="asset-price">
                    {`${format(price, quote)}`}
                </div>
            </div>
            <div className="right-column">
                <button className="asset-delete" onClick={() => onDelete(asset)}>
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="20" y2="20" stroke="black" strokeWidth="2"/>
                        <line x1="20" y1="0" x2="0" y2="20" stroke="black" strokeWidth="2"/>
                    </svg>
                </button>
                <div 
                    style={{color: change[0] == "+" ? "green" : "red"}} 
                    className="asset-changes"
                >
                    {change}
                </div>
            </div>
            
        </div>
    );
}

export default function Contents( {selectedAssets, onDelete} ) {
    return (
        <>
            <div className="assets-grid">
                {selectedAssets.map((asset) => {
                    return (
                        <Row key={`${asset}.contents`} asset={asset} onDelete={onDelete}/>
                    );
                })}
            </div>
        </> 
    );
}