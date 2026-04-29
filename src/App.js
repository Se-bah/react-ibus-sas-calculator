import React, { useState, useEffect } from "react";
import "./App.css";
import { calculators } from "./calculators";

function App() {
    const [theme, setTheme] = useState("light");
    const [activeCalculatorId, setActiveCalculatorId] = useState("ibus-sas");

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const activeCalculator = calculators.find(
        (calculator) => calculator.id === activeCalculatorId
    );

    const ActiveCalculatorView = activeCalculator.component;

    return (
        <div className="App">
            <div className="titlebar">
                <div className="titlebar-drag">
                    <select
                        className="title-dropdown"
                        value={activeCalculatorId}
                        onChange={(e) => setActiveCalculatorId(e.target.value)}
                    >
                        {calculators.map((calculator) => (
                            <option key={calculator.id} value={calculator.id}>
                                {calculator.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="window-controls">
                    <button
                        className="window-btn minimize"
                        onClick={() => window.electron.minimize()}
                    >
                        —
                    </button>

                    <button
                        className="window-btn close"
                        onClick={() => window.electron.close()}
                    >
                        ✕
                    </button>
                </div>
            </div>

            <div className="app-card">
                <div className="header">
                    <h1>{activeCalculator.name} Calculator</h1>

                    <button
                        className="theme-toggle"
                        onClick={() =>
                            setTheme((current) =>
                                current === "light" ? "dark" : "light"
                            )
                        }
                    >
                        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                </div>

                <ActiveCalculatorView />
            </div>
        </div>
    );
}

export default App;