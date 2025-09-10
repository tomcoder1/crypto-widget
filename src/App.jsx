import { useState, useEffect } from "react";

import TitleBar from "./components/TitleBar";
import AddAsset from "./components/AddAsset"; 
import Contents from "./components/Contents";

import "./styles/App.css";

export default function App() {
    const [selectedAssets, setSelectedAssets] = useState(() => {
        const data = localStorage.getItem("selectedAssets");
        return data ? JSON.parse(data) : [];
    });
    useEffect(() => {
        localStorage.setItem("selectedAssets", JSON.stringify(selectedAssets));
    }, [selectedAssets]);

    const selectAsset = (asset) => {
        setSelectedAssets((prev) => {
            if (prev.includes(asset)) {
                return prev;
            } else {
                return [...prev, asset];
            }
        });
    }
    const deleteAsset = (asset) => {
        setSelectedAssets((prev) => prev.filter((value) => value !== asset));
    }
    return (
        <div>
            <TitleBar />
            <header className="title"> Cryptocurrencies </header> 
            <Contents selectedAssets={selectedAssets} onDelete={deleteAsset}/>
            <AddAsset onSelect={selectAsset}/>
        </div>
    );
}