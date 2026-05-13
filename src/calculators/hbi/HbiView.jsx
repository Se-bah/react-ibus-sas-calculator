import React, { useState } from "react";
import {
    calculate,
    validate,
    interpret,
    referenceValues,
    complicationOptions
} from "./hbiLogic";

export default function HbiView() {
    const [values, setValues] = useState({
        wellBeing: "",
        abdominalPain: "",
        liquidStools: "",
        abdominalMass: "",
        hasComplications: "",
        complications: []
    });

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);

    const updateValue = (field, value) => {
        setValues((current) => ({
            ...current,
            [field]: value
        }));
    };

    const toggleComplication = (item) => {
        setValues((current) => {
            const exists = current.complications.includes(item);

            return {
                ...current,
                complications: exists ? current.complications.filter ((x) => x !== item) : [...current.complications, item]
            };
        });
    };

    const handleCalculate = () => {
        const newErrors = validate(values);
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        setResult(calculate(values));
    };

    return (
        <>
            {/* General Well-being  */}
        <div className = "question-block">
            <label>General Well-being</label>

            <select
                value = {values.wellBeing}
                onChange = {(e) => updateValue("wellBeing", e.target.value)}
                className = {errors.wellBeing ? "input-error" : ""}
                >

                <option value = "">Select</option>
                <option value = "0">0 - excellent</option>
                <option value = "1">1 - good</option>
                <option value = "2">2 - fair</option>
                <option value = "3">3 - poor</option>
                <option value = "4">4 - terrible</option>
            </select>

            {errors.wellBeing && <p className = "error-text">Please select a value</p>}
        </div>

            {/* Abdominal pain */}
        <div className = "question-block">
            <label>Abdominal Pain</label>

            <select
                value = {values.abdominalPain}
                onChange = {(e) => updateValue("abdominalPain", e.target.value)}
                className = {errors.abdominalPain ? "input-error" : ""}
            >

                <option value = "">Select</option>
                <option value = "0">0 - none</option>
                <option value = "1">1 - mild</option>
                <option value = "2">2 - moderate</option>
                <option value = "3">3 - severe</option>
            </select>

            {errors.abdominalPain && <p className = "error-text">Please select a value</p>}
        </div>

            {/* Number of Liquid Stools per Day */}
        <div className = "question-block">
            <label>Number of Liquid Stools per Day</label>

            <input
                type = "number"
                min = "0"
                step = "1"
                value = {values.liquidStools}
                onChange = {(e) => updateValue("liquidStools", e.target.value)}
                className = {errors.liquidStools ? "input-error" : ""}
                />

            {errors.liquidStools && <p className = "error-text">Enter a valid number (≥ 0)</p>}
        </div>

            {/* Abdominal Mass */}
        <div className = "question-block">
            <label>Abdominal Mass</label>

            <select
                value = {values.abdominalMass}
                onChange = {(e) => updateValue("abdominalMass", e.target.value)}
                className = {errors.abdominalMass ? "input-error" : ""}
            >

                <option value = "">Select</option>
                <option value = "0">0 - absent</option>
                <option value = "1">1 - dubious</option>
                <option value = "2">2 - definite</option>
                <option value = "3">3 - definite and tender</option>
            </select>

            {errors.abdominalMass && <p className = "error-text">Please select a value</p>}
        </div>

            {/* Complications - yes/no choice, much like any other question block earlier */}
        <div className = "question-block">
            <label>Complications:</label>

            <select
                value = {values.hasComplications}
                onChange = {(e) => {const selectedValue = e.target.value;

                    setValues((current) => ({
                        ...current,
                        hasComplications: selectedValue,
                        complications:
                            selectedValue === "yes" ? current.complications : []
                    }));
                }}
                className = {errors.hasComplications ? "input-error" : ""}
            >
                <option value = "">Select</option>
                <option value = "no">no</option>
                <option value = "yes">yes</option>
            </select>
            <p className = "help-text">
                No - 0 points are added, Yes - for more complications
            </p>

            {errors.hasComplications && <p className = "error-text">Please select a value</p>}
        </div>

            {/* Complications - if you choose YES earlier, more options show up */}
            {/* there is no error-check yet for no boxes ticked, so the default value is just 0 */}
            {values.hasComplications === "yes" && (
        <div className = "question-block">
            <label>Complication Details:</label>
            <div className = "checkbox-group">
                {complicationOptions.map((item) =>(
                    <label
                        key = {item}
                        className = "checkbox-item"
                        >
                        <input
                            type = "checkbox"
                            checked = {values.complications.includes(item)}
                            onChange = {() => toggleComplication(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>

            <p className = "help-text">
                Each selected complication adds 1 point
            </p>
        </div>
            )}
        <button
            className = "calculate-btn"
            onClick = {handleCalculate}
            >
            Calculate
        </button>

            {result !== null && (
                <div className = "result">
                    <h2>HBI Score: {result}</h2>

                    <p>
                        <strong>Interpretation:</strong>{" "}
                        {interpret(result)}
                    </p>

                    <div className = "reference-values">
                        <strong>Values:</strong>

                        <ul>
                            {referenceValues.map((item) =>(
                                <li key = {item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}