import React, {useState} from "react";
import{
    calculate,
    validate,
    interpret,
    referenceValues
} from "./logic";

export default function IbusSasView(){
    const [values, setValues] = useState({
        bwt: "",
        ifat: "",
        cds: "",
        bws: "",
    });

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);

    const updateValue = (field, value) => {
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleCalculate = () => {
        const newErrors = validate (values);
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        setResult(calculate(values));
    };

    return (
        <>
            {/* BWT */}
            <div className = "question-block">
                <label>BWT (mm):</label>
                <input
                    type = "number"
                    min = "0"
                    step = "0.01"
                    value = {values.bwt}
                    onChange = {(e) => updateValue("bwt", e.target.value)}
                    className = {errors.bwt ? "input-error" : ""}
                />
                {errors.bwt && <p className = "error-text">Enter a valid BWT value (≥ 0)</p>}
                <p className = "help-text">
                    Enter bowel wall thickness in millimeters (e.g., 3.4)
                </p>
            </div>

            {/* i-fat */}
            <div className = "question-block">
                <label>i-fat (0–2):</label>
                <select
                    value = {values.ifat}
                    onChange = {(e) => updateValue("ifat", e.target.value)}
                    className = {errors.ifat ? "input-error" : ""}
                >
                    <option value = "">Select</option>
                    <option value = "0">0 - none</option>
                    <option value = "1">1 - unclear</option>
                    <option value = "2">2 - present</option>
                </select>
                {errors.ifat && <p className = "error-text">Please select a value</p>}
                <p className = "help-text">
                    Degree of inflammatory fat (0 = none, 2 = severe)
                </p>
            </div>

            {/* CDS */}
            <div className = "question-block">
                <label>CDS (0–3):</label>
                <select
                    value={values.cds}
                    onChange={(e) => updateValue("cds", e.target.value)}
                    className={errors.cds ? "input-error" : ""}
                >
                    <option value = "">Select</option>
                    <option value = "0">0 - absent signal</option>
                    <option value = "1">1 - short round signals</option>
                    <option value = "2">2 - longitudinal signals within the intestinal wall</option>
                    <option value = "3">3 - long signals outside the intestinal wall</option>
                </select>
                {errors.cds && <p className = "error-text">Please select a value</p>}
                <p className = "help-text">
                    Color Doppler Signal (0 = none, 3 = severe)
                </p>
            </div>

            {/* BWS */}
            <div className = "question-block">
                <label>BWS (0–3):</label>
                <select
                    value = {values.bws}
                    onChange = {(e) => updateValue("bws", e.target.value)}
                    className = {errors.bws ? "input-error" : ""}
                >
                    <option value = "">Select</option>
                    <option value = "0">0 - normal, preserved</option>
                    <option value = "1">1 - unclear</option>
                    <option value = "2">2 - focal loss &lt; 3 cm</option>
                    <option value = "3">3 - extensive loss &gt; 3 cm</option>
                </select>
                {errors.bws && <p className = "error-text">Please select a value</p>}
                <p className = "help-text">
                    Bowel wall stratification (0 = normal, 3 = severe)
                </p>
            </div>

            <button className = "calculate-btn" onClick = {handleCalculate}>
                Calculate
            </button>

            {result !== null && (
                <div className = "result">
                    <h2>IBUS-SAS Score: {result}</h2>

                    <p>
                        <strong>Interpretation: </strong>{" "}
                        {interpret(result)}
                    </p>

                    <div className = "reference-values">
                        <strong>Values:</strong>

                        <ul>
                            {referenceValues.map((item) => (
                            <li key = {item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}