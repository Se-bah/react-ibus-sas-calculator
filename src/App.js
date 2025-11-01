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
            <input type="number" value={bwt} onChange={(e) => setBwt(e.target.value)} />

            <label>i-fat (0–2):</label>
            <input type="number" value={ifat} onChange={(e) => setIfat(e.target.value)} />

            <label>CDS (0–3):</label>
            <input type="number" value={cds} onChange={(e) => setCds(e.target.value)} />

            <label>BWS (0–3):</label>
            <input type="number" value={bws} onChange={(e) => setBws(e.target.value)} />

            <button onClick={calculateScore}>Calculate</button>

            {result !== null && <h2>IBUS-SAS Score: {result}</h2>}
        </div>
    );
}

export default App;
