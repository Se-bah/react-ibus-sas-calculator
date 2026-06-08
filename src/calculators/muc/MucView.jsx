import React, { useState } from "react";
import NumberInput from "../../components/NumberInput"
import SelectInput from "../../components/SelectInput"
import ResultBox from "../../components/ResultBox"

import {
    calculate,
    validate,
    interpret,
    referenceValues
} from "./mucLogic";

function MucView() {
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
            {/* BWT */}
            <NumberInput
            label = "BWT (mm)"
            value = {values.bwt}
            onChange = {(value) => updateValue("bwt", value)}
            error =  {errors.bwt}
            errorMessage = "Enter a valid BWT value (≥ 0)"
            helpText = "Bowel wall thickness in millimeters."
            step = "0.01"
            />

            {/* CDS */}
            <SelectInput
                label = "CDS:"
                value = {values.cds}
                onChange = {(value) => updateValue("cds", value)}
                error = {errors.cds}
                errorMessage = "Please select a CDS value"
                helpText = "Color Doppler Signal."
                options = {[
                    { value: "0", label: "0 - absent" },
                    { value: "1", label: "1 - present" }
                ]}
            />

            <button className = "calculate-btn" onClick = {handleCalculate}>
                Calculate
            </button>

            {result !== null && (
                <ResultBox
                    title = "MUC Score"
                    score = {result.toFixed(2)}
                    interpretation = {interpret(result)}
                    referenceValues = {referenceValues}
                />
            )}
        </>
    );
}

export default MucView;