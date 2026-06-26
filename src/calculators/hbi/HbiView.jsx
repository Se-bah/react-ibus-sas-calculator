import React, { useState } from "react";

import NumberInput from "../../components/NumberInput";
import SelectInput from "../../components/SelectInput";
import ResultBox from "../../components/ResultBox";
import CheckboxGroup from "../../components/CheckboxGroup";

import {
    calculate,
    validate,
    interpret,
    referenceValues,
    complicationOptions
} from "./hbiLogic";

function HbiView() {
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
        const updatedValues = {
            ...values,
            [field]: value
        };

        const newErrors = validate(updatedValues);
        const hasErrors = Object.values(newErrors).some(Boolean);

        setValues(updatedValues);
        setErrors(newErrors);
        setResult(hasErrors ? null : calculate(updatedValues));
    };

    const updateHasComplications = (value) => {
        const updatedValues = {
            ...values,
            hasComplications: value,
            complications: value === "yes" ? values.complications : []
        };

        const newErrors = validate(updatedValues);
        const hasErrors = Object.values(newErrors).some(Boolean);

        setValues(updatedValues);
        setErrors(newErrors);
        setResult(hasErrors ? null : calculate(updatedValues));
    };

    const toggleComplication = (item) => {
        const exists = values.complications.includes(item);

        const updatedValues = {
            ...values,
            complications: exists ? exists.complications.filter((x) => x !== item)
                : [...values.complications, item]
        };
        const newErrors = validate(updatedValues);
        const hasErrors = Object.values(newErrors).some(Boolean);

        setValues(updatedValues);
        setErrors(newErrors);
        setResult(hasErrors ? null : calculate(updatedValues));
    };

    const handleCalculate = () => {
        const newErrors = validate(values);
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        setResult(calculate(values));
    };

    const handleReset = () => {
        setValues({
            wellBeing: "",
            abdominalPain: "",
            liquidStools: "",
            abdominalMass: "",
            hasComplications: "",
            complications: []
        });

        setErrors({});
        setResult(null);
    };

    return (
        <>
            {/* General Well-being  */}
        <SelectInput
            label = "General Well-being"
            value = {values.wellBeing}
            onChange = {(value) => updateValue("wellBeing", value)}
            helpText = "(0 = excellent, 4 = terrible)"
            options = {[
                { value: "0", label: "0 - excellent" },
                { value: "1", label: "1 - good" },
                { value: "2", label: "2 - fair" },
                { value: "3", label: "3 - poor" },
                { value: "4", label: "4 - terrible" }
            ]}
        />

            {/* Abdominal pain */}
        <SelectInput
            label = "Abdominal Pain"
            value = {values.abdominalPain}
            onChange = {(value) => updateValue("abdominalPain", value)}
            helpText = "Level of abdominal pain (0 = none, 3 = severe)"
            options = {[
                { value: "0", label: "0 - none" },
                { value: "1", label: "1 - mild" },
                { value: "2", label: "2 - moderate" },
                { value: "3", label: "3 - severe" }
            ]}
        />

            {/* Number of Liquid Stools per Day */}
        <NumberInput
            label = "Number of Liquid Stools per day"
            value = {values.liquidStools}
            onChange = {(value) => updateValue("liquidStools", value)}
            helpText = "Enter a number of Liquid Stools per day (e.g., 3)"
        />

            {/* Abdominal Mass */}
        <SelectInput
            label = "Abdominal Mass"
            value = {values.abdominalMass}
            onChange = {(value) => updateValue("abdominalMass", value)}
            helpText = "Abdominal mass on examination (0 = absent, 3 = definite and tender)"
            options = {[
                { value: "0", label: "0 - absent" },
                { value: "1", label: "1 - dubious" },
                { value: "2", label: "2 - definite" },
                { value: "3", label: "3 - definite and tender" }
            ]}
        />

            {/* Complications - yes/no choice, much like any other question block earlier */}
        <SelectInput
            label = "Complications"
            value = {values.hasComplications}
            onChange = {updateHasComplications}
            helpText = "NO = 0 points added, YES = choose complications below"
            options = {[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" }
            ]}
        />

            {/* Complications - if you choose YES earlier, more options show up */}
            {/* there is no error-check yet for no boxes ticked, so the default value is just 0 */}

            {values.hasComplications === "yes" && (
                <CheckboxGroup
                    label = "Complication Details: "
                    options = {complicationOptions}
                    selectedOptions = {values.complications}
                    onToggle = {toggleComplication}
                    helpText = "Each selected complication adds 1 point"
                    />
            )}
        <button className = "calculate-btn" onClick = {handleReset}>
            Reset
        </button>

            {result !== null && (
                <ResultBox
                    title = "HBI Score"
                    score = {result}
                    interpretation = {interpret(result)}
                    referenceValues = {referenceValues}
                />
            )}
        </>
    );
}
export default HbiView;