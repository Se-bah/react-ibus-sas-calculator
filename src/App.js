import React, { useState } from "react";
import "./App.css";

function App() {
    const [bwt, setBwt] = useState("");
    const [ifat, setIfat] = useState("");
    const [cds, setCds] = useState("");
    const [bws, setBws] = useState("");
    const [result, setResult] = useState(null);

    const calculateScore = () => {
        // - - - - - Added validation!! - - - - - -
        if (bwt === ""  || isNaN(bwt) || Number(bwt) < 0){
            alert("Please enter a valid BWT value (must be a number > 0)");
            return;
        }
        if (ifat === "" || cds === "" || bws === "") {
            alert("Please choose all values before calculating.");
            return;
        }
        //  - - - - - Calculation - - - - -
        const score =
            4 * Number(bwt) + 15 * Number(ifat) + 7 * Number(cds) + 4 * Number(bws);
        setResult(score);
    };

    return (
        <div className="App">
            <h1>IBUS-SAS Calculator</h1>

            <div className="question-block">
                <label>BWT (mm):</label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={bwt}
                    onChange={(e) => setBwt(e.target.value)}
                />
                <p className="help-text">
                    Enter bowel wall thickness in millimeters (e.g., 3.4)
                </p>
            </div>

            <div className="question-block">
                <label>i-fat (0–2):</label>
                <select value={ifat} onChange={(e) => setIfat(e.target.value)}>
                    <option value="">Select</option>
                    <option value="0">0 - none</option>
                    <option value="1">1 - unclear</option>
                    <option value="2">2 - present</option>
                </select>
                <p className="help-text">
                    Degree of inflammatory fat (0 = none, 2 = severe)
                </p>
            </div>

            <div className="question-block">
            <label>CDS (0–3):</label>
            <select value={cds} onChange={(e) => setCds(e.target.value)}>
                <option value="">Select</option>
                <option value="0">0 - absent signal (mLimberg 0)</option>
                <option value="1">1 - short round signals (mlimberg 1)</option>
                <option value="2">2 - longitudinal signals within the intestinal wall (mLimberg 2)</option>
                <option value="3">3 - long signals also outside the intestinal wall (mLimberg 3)</option>
            </select>
                <p className="help-text">
                    Color Doppler Signal (0 = none, 3 = severe)
                </p>
            </div>

            <div className="question-block">
            <label>BWS (0–3):</label>
             <select value={bws} onChange={(e) => setBws(e.target.value)}>
                 <option value="">Select</option>
                 <option value="0">0 - normal, preserved</option>
                 <option value="1">1 - unclear</option>
                 <option value="2">2 - phocal loss &lt; 3 cm</option>
                 <option value="3">3 - extensive loss &gt; 3 cm</option>
             </select>
                <p className="help-text">
                    Bowel wall stratification (0 = normal, 3 = severe)
                </p>
            </div>

            <button onClick={calculateScore}>Calculate</button>

            {result !== null && <h2>IBUS-SAS Score: {result}</h2>}
        </div>
    );
}

export default App;
