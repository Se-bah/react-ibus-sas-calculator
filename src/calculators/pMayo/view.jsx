import React, { useState } from "react";
import {
    calculate,
    validate,
    interpret,
    referenceValues
} from "./logic";

export default function PMayoView() {
    const [values, setValues] = useState({
        stoolFrequency: "",
        rectalBleeding: "",
        physicianAssessment: "",
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

        setResult(calculate(values))
    };

    return (
        <>
            <div className = "question-block">
                <label>Stool Frequency:</label>

                <select
                    value = {values.stoolFrequency}
                    onChange = {(e) => updateValue("stoolFrequency", e.target.value)}
                    className = {errors.stoolFrequency ? "input-error" : ""}
                    >
                    <option value = "">Select</option>
                    <option value = "0">0 - Normal</option>
                    <option value = "1">1 - 1 to 2 stools/day more than normal</option>
                    <option value = "2">2 - 3 to 4 stools/day more than normal</option>
                    <option value = "3">3 - 5 or more stools/day more than normal</option>
                </select>

                {errors.stoolFrequency && (
                    <p className = "error-text">Please select a value</p>
                )}
            </div>


            <div className = "question-block">
                <label>Rectal Bleeding:</label>

                <select
                    value = {values.rectalBleeding}
                    onChange = {(e) => updateValue("rectalBleeding", e.target.value)}
                    className = {errors.rectalBleedingbleeding ? "input-error" : ""}
                    >

                    <option value = "">Select</option>
                    <option value = "0">0 - absent</option>
                    <option value = "1">1 - traces of blood less than half the time</option>
                    <option value = "2">2 - obvious blood most of the time</option>
                    <option value = "3">3 - blood only</option>
                </select>

                {errors.rectalBleeding && (
                    <p className = "error-text">Please select a value</p>
                )}
            </div>


            <div className = "question-block">
                <label>Physician Global Assessment: </label>

                <select
                    value = {values.physicianAssessment}
                    onChange = {(e) => updateValue("physicianAssessment", e.target.value)}
                    className = {errors.physicianAssessment ? "input-error" : ""}
                    >
                    <option value = "">Select</option>
                    <option value = "0">0 - normal</option>
                    <option value = "1">1 - mild disease</option>
                    <option value = "2">2 - moderate disease</option>
                    <option value = "3">3 - severe disease</option>
                </select>

                {errors.physicianAssessment && (
                    <p className = "error-text">Please select a value</p>
                )}
            </div>

            <button className = "calculate-btn" onClick={handleCalculate}>
                Calculate
            </button>

            {result !== null && (
                <div className = "result">
                    <h2>pMayo Score: {result}</h2>

                    <p>
                        <strong>Interpretation:</strong>{" "}
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
            )}d
        </>
    );
}