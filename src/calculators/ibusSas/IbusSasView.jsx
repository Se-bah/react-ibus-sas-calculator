import React, {useState} from "react";

import NumberInput from "../../components/NumberInput";
import SelectInput from "../../components/SelectInput";
import ResultBox from "../../components/ResultBox";

import{
    calculate,
    validate,
    interpret,
    referenceValues
} from "./ibusSasLogic";
import MucView from "../muc/MucView";

function IbusSasView(){
    const [values, setValues] = useState({
        bwt: "",
        ifat: "",
        cds: "",
        bws: "",
    });

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);

    const updateValue = (field, value) => {
        const updatedValues = {
            ...values,
            [field]: value
        };

        const newErrors = validate(updatedValues);
        const hasErrors = Object.values(newErrors).some(Boolean);

        setValues(updatedValues);
        setErrors(hasErrors);
        setResult(hasErrors ? null : calculate(updatedValues));
    };

    const handleCalculate = () => {
        const newErrors = validate (values);
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        setResult(calculate(values));
    };

    const handleReset = () => {
        setValues({
            bwt: "",
            ifat: "",
            cds: "",
            bws: ""
        });

        setErrors({})
        setResult(null);
    };

    return (
        <>
            {/* BWT */}
            <NumberInput
                label = "BWT (mm)"
                value = {values.bwt}
                onChange = {(value) => updateValue("bwt", value)}
                helpText = "Enter bowell wall thickness in millimeters (e.g., 3.4)"
                step = "0.01"
            />

            {/* i-fat */}
            <SelectInput
                label = "i-fat (0-2)"
                value = {values.ifat}
                onChange = {(value) => updateValue("ifat", value)}
                helpText = "Degree of inflammatory fat (0 = none, 2 = severe)"
                options = {[
                    { value: "0", label: "0 - none"},
                    { value: "1", label: "1 - unclear"},
                    { value: "2", label: "2 - present"},
                ]}
            />

            {/* CDS */}
            <SelectInput
                label = "CDS (0-3)"
                value = {values.cds}
                onChange = {(value) => updateValue("cds", value)}
                helpText = "Color Doppler Signal (0 = none, 3 = severe"
                options = {[
                    { value: "0", label: "0 - absent signal"},
                    { value: "1", label: "1 - short round signals"},
                    { value: "2", label: "2 - longitudinal signals within the intestinal wall"},
                    { value: "3", label: "3 - long signals outside the intestinal wall"},
                ]}
            />

            {/* BWS */}
            <SelectInput
                label = "BWS (0-3)"
                value = {values.bws}
                onChange = {(value) => updateValue("bws", value)}
                helpText = "Bowel wall stratification (0 = normal, 3 = severe)"
                options = {[
                    { value: "0", label: "0 - normal, preserved"},
                    { value: "1", label: "1 - unclear"},
                    { value: "2", label: "2 - focal loss < 3cm"},
                    { value: "3", label: "3 - extensive loss > 3cm"},
                ]}
            />

            <button className = "calculate-btn" onClick = {handleReset}>
                Reset
            </button>

            {result !== null && (
                <ResultBox
                    title = "IBUS-SAS Score"
                    score = {result}
                    interpretation = {interpret (result)}
                    referenceValues = {referenceValues}
                />
            )}
        </>
    );
}

export default IbusSasView;