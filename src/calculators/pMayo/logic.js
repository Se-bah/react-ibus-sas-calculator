export function calculate (values) {
    return (
        Number(values.stoolFrequency) +
        Number(values.bleeding) +
        Number(values.physicianAssessment)
    );
}

export function validate (values) {
    return {
        stoolFrequency: values.stoolFrequency === "",
        bleeding: values.bleeding === "",
        physicianAssessment: values.physicianAssessment === ""
    };
}

export function interpret (score) {
    if (score <= 2) {
        return "Remission (0-2)";
    }

    if (score <= 4) {
        return "Mild activity (3-4)";
    }

    if (score <= 7) {
        return "Moderate activity (5-7)";
    }

    return "Severe activity (> 7)";
}

export const referenceValues = [
    "0 – 2 = remission",
    "3 – 4 = mild activity",
    "5 – 7 = moderate activity",
    "> 7 = severe activity"
];