import React, { useState } from "react";

import SelectInput from "../../components/SelectInput";
import ResultBox from "../../components/ResultBox";

import {
    calculate,
    validate,
    interpret,
    referenceValues
} from "./pMayoLogic";

function PMayoView() {
    const [values, setValues] = useState({
        stoolFrequency: "",
        rectalBleeding: "",
        physicianAssessment: "",
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
        const newErrors = validate(values);
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        setResult(calculate(values))
    };

    const handleReset = () => {
        setValues({
            stoolFrequency: "",
            rectalBleeding: "",
            physicianAssessment: "",
        });

        setErrors({});
        setResult(null);
    };

    return (
        <>
            {/* Stool frequency */}
            <SelectInput
                label = "Stool Frequency"
                value = {values.stoolFrequency}
                onChange = {(value) => updateValue("stoolFrequency", value)}
                error = {errors.stoolFrequency}
                erorrMessage = "Please select a value"
                helpText = "Increase in stool frequency (0 = normal, 3 = ≥ 5 stools/day above normal)"
                options = {[
                    { value: "0", label: "0 - normal" },
                    { value: "1", label: "1 - 1 to 2 stools/day more than normal" },
                    { value: "2", label: "2 - 3 to 4 stools/day more than normal" },
                    { value: "3", label: "3 - 5 or more stools/day more than normal" },
                ]}
            />

            {/* Rectal bleeding */}
            <SelectInput
                label = "Rectal Bleeding"
                value = {values.rectalBleeding}
                onChange = {(value) => updateValue("rectalBleeding", value)}
                error = {errors.rectalBleeding}
                errorMessage = "Please select a value"
                helpText = "Severity of rectal bleeding (0 = absent, 3 = blood only)"
                options = {[
                    { value: "0", label: "0 - absent" },
                    { value: "1", label: "1 - traces of blood less than half the time" },
                    { value: "2", label: "2 - obvious blood most of the time" },
                    { value: "3", label: "3 - blood only" }
                ]}
            />

            {/* Physician Global Assessment  */}
            <SelectInput
                label = "Physician's Assessment"
                value = {values.physicianAssessment}
                onChange = {(value) => updateValue("physicianAssessment", value)}
                error = {errors.physicianAssessment}
                errorMessage = "Please select a value"
                helpText = "Overall disease assessment (0 = normal, 3 = severe disease)"
                options = {[
                    { value: "0", label: "0 - normal" },
                    { value: "1", label: "1 - mild disease" },
                    { value: "2", label: "2 - moderate disease" },
                    { value: "3", label: "3 - severe disease" },
                ]}
            />

            <button className = "calculate-btn" onClick={handleReset}>
                Reset
            </button>

            {result !== null && (
                <ResultBox
                    title = "pMayo Score"
                    score = {result}
                    interpretation = {interpret(result)}
                    referenceValues = {referenceValues}
                />
            )}
        </>
    );
}

export default PMayoView;