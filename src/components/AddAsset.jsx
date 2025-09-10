import { useEffect, useState } from "react";

import "./../styles/AddAsset.css"

let availableAssets = null;

export default function AddAsset( {onSelect} ) {
    const [pressed, setPressed] = useState(false);
    const [query, setQuery] = useState("");
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        if (availableAssets) {
            setAssets(availableAssets);
            return;
        } else {
            fetch("https://api.binance.com/api/v3/exchangeInfo") 
            .then(res => res.json()) 
            .then(data => { 
                availableAssets = data.symbols.map(item => item.symbol);
                setAssets(availableAssets);
            }) 
            .catch(err => console.error(err));
        }
    }, []);

    return (
        <div className="wrapper">
            {pressed ? (
                <div className="search-container">
                    {query !== "" && (
                        <div className="search-results">
                            {assets
                            .filter(item => item.toLowerCase().includes(query.toLowerCase()))
                            .map((asset) => {
                                return (
                                    <button className="search-result" key={`${asset}.search`} onMouseDown={() => onSelect(asset)}>
                                        {asset}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    <input
                        autoFocus
                        className="input-field"
                        placeholder="Type..."
                        onChange={(e) => {setQuery(e.target.value)}}
                        onBlur={() => {setPressed(false); setQuery("");}}
                        value={query}
                    />
                </div>
            ) : (
                <button className="add-button" onClick={() => {setPressed(true)}}>
                    Add asset
                </button> 
            )}
        </div>
    );
}