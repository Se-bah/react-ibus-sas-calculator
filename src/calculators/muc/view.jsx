import React, { useState } from "react";
import {
    calculate,
    validate,
    interpret,
    referenceValues
} from "./logic";

export default function MucView() {
    const [values, setValues] = useState({
        bwt: "",
        cds: ""
    });

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);

    const updateValue = (field, value) => {
        setValues((current) => ({
            ...current,
            [field]: value
        }));
    };

    const handleCalculate = () => {
        const newErrors = validate(values);
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        const score = calculate(values);
        setResult(score);
    };

    return (
        <>
            <div className="question-block">
                <label>BWT (mm):</label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={values.bwt}
                    onChange={(e) => updateValue("bwt", e.target.value)}
                    className={errors.bwt ? "input-error" : ""}
                />
                {errors.bwt && (
                    <p className="error-text">Enter a valid BWT value (≥ 0)</p>
                )}
                <p className="help-text">
                    Enter bowel wall thickness in millimeters.
                </p>
            </div>

            <div className="question-block">
                <label>CDS:</label>
                <select
                    value={values.cds}
                    onChange={(e) => updateValue("cds", e.target.value)}
                    className={errors.cds ? "input-error" : ""}
                >
                    <option value="">Select</option>
                    <option value="0">0 - absent signal</option>
                    <option value="1">1 - present signal</option>
                </select>
                {errors.cds && (
                    <p className="error-text">Please select a value</p>
                )}
                <p className="help-text">
                    Color Doppler Signal.
                </p>
            </div>

            <button className="calculate-btn" onClick={handleCalculate}>
                Calculate
            </button>

            {result !== null && (
                <div className="result">
                    <h2>MUC Score: {result.toFixed(2)}</h2>

                    <p>
                        <strong>Interpretation:</strong>{" "}
                        {interpret(result)}
                    </p>

                    <div className="reference-values">
                        <strong>Values:</strong>
                        <ul>
                            {referenceValues.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}