import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [theme, setTheme] = useState("light");
    const [bwt, setBwt] = useState("");
    const [ifat, setIfat] = useState("");
    const [cds, setCds] = useState("");
    const [bws, setBws] = useState("");
    const [result, setResult] = useState(null);

    // Validation tracking
    const [errors, setErrors] = useState({
        bwt: false,
        ifat: false,
        cds: false,
        bws: false
    });

    // Update theme class on <body>
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const calculateScore = () => {
        const newErrors = {
            bwt: bwt === "" || isNaN(bwt) || Number(bwt) < 0,
            ifat: ifat === "",
            cds: cds === "",
            bws: bws === ""
        };

        setErrors(newErrors);

        // Stop if any errors exist
        const hasError = Object.values(newErrors).some((e) => e === true);
        if (hasError) return;

        const score =
            4 * Number(bwt) + 15 * Number(ifat) + 7 * Number(cds) + 4 * Number(bws);

        setResult(score);
    };

    return (
        <div className="App">
            <div className="app-card">
                <div className="header">
                    <h1>IBUS-SAS Calculator</h1>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                </div>

                {/* BWT */}
                <div className="question-block">
                    <label>BWT (mm):</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={bwt}
                        onChange={(e) => setBwt(e.target.value)}
                        className={errors.bwt ? "input-error" : ""}
                    />
                    {errors.bwt && (
                        <p className="error-text">Enter a valid BWT value (≥ 0)</p>
                    )}
                    <p className="help-text">
                        Enter bowel wall thickness in millimeters (e.g., 3.4)
                    </p>
                </div>

                {/* i-fat */}
                <div className="question-block">
                    <label>i-fat (0–2):</label>
                    <select
                        value={ifat}
                        onChange={(e) => setIfat(e.target.value)}
                        className={errors.ifat ? "input-error" : ""}
                    >
                        <option value="">Select</option>
                        <option value="0">0 - none</option>
                        <option value="1">1 - unclear</option>
                        <option value="2">2 - present</option>
                    </select>
                    {errors.ifat && <p className="error-text">Please select a value</p>}
                    <p className="help-text">
                        Degree of inflammatory fat (0 = none, 2 = severe)
                    </p>
                </div>

                {/* CDS */}
                <div className="question-block">
                    <label>CDS (0–3):</label>
                    <select
                        value={cds}
                        onChange={(e) => setCds(e.target.value)}
                        className={errors.cds ? "input-error" : ""}
                    >
                        <option value="">Select</option>
                        <option value="0">0 - absent signal</option>
                        <option value="1">1 - short round signals</option>
                        <option value="2">
                            2 - longitudinal signals within the intestinal wall
                        </option>
                        <option value="3">
                            3 - long signals outside the intestinal wall
                        </option>
                    </select>
                    {errors.cds && <p className="error-text">Please select a value</p>}
                    <p className="help-text">
                        Color Doppler Signal (0 = none, 3 = severe)
                    </p>
                </div>

                {/* BWS */}
                <div className="question-block">
                    <label>BWS (0–3):</label>
                    <select
                        value={bws}
                        onChange={(e) => setBws(e.target.value)}
                        className={errors.bws ? "input-error" : ""}
                    >
                        <option value="">Select</option>
                        <option value="0">0 - normal, preserved</option>
                        <option value="1">1 - unclear</option>
                        <option value="2">2 - focal loss &lt; 3 cm</option>
                        <option value="3">3 - extensive loss &gt; 3 cm</option>
                    </select>
                    {errors.bws && <p className="error-text">Please select a value</p>}
                    <p className="help-text">
                        Bowel wall stratification (0 = normal, 3 = severe)
                    </p>
                </div>

                <button className="calculate-btn" onClick={calculateScore}>
                    Calculate
                </button>

                {result !== null && (
                    <h2 className="result">IBUS-SAS Score: {result}</h2>
                )}
            </div>
        </div>
    );
}

export default App;
