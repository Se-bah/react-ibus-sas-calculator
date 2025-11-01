import React, { useState } from "react";
import "./App.css";

function App() {
    const [bwt, setBwt] = useState("");
    const [ifat, setIfat] = useState("");
    const [cds, setCds] = useState("");
    const [bws, setBws] = useState("");
    const [result, setResult] = useState(null);

    const calculateScore = () => {
        const score =
            4 * Number(bwt) + 15 * Number(ifat) + 7 * Number(cds) + 4 * Number(bws);
        setResult(score);
    };

    return (
        <div className="App">
            <h1>IBUS-SAS Calculator</h1>

            <label>BWT (mm):</label>
            <select value ={bwt} onChange={(e) => setBwt(e.target.value)}>
                <option value="">Select</option>
                <option value="1">1 mm</option>
                <option value="2">2 mm</option>
                <option value="3">3 mm</option>
                <option value="4">4 mm</option>
                <option value="5">5 mm</option>
            </select>

            <label>i-fat (0–2):</label>
            <select value={ifat} onChange={(e) => setIfat(e.target.value)}>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>

            <label>CDS (0–3):</label>
            <select value={cds} onChange={(e) => setCds(e.target.value)}>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>

            <label>BWS (0–3):</label>
             <select value={bws} onChange={(e) => setBws(e.target.value)}>
                 <option value="">Select</option>
                 <option value="0">0</option>
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
             </select>

            <button onClick={calculateScore}>Calculate</button>

            {result !== null && <h2>IBUS-SAS Score: {result}</h2>}
        </div>
    );
}

export default App;
