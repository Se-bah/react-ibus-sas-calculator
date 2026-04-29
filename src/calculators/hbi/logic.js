export const complicationOptions = [
    "Arthralgia",
    "Uveitis",
    "Erythema nodosum",
    "Aphthous ulcers",
    "Pyoderma gangrenosum",
    "Anal fissures",
    "New fistula",
    "Abscess"
];

export function calculate(values) {
    const complicationScore =
        values.hasComplications === "yes" ? values.complications.length : 0;

    return (
        Number(values.wellBeing) +
        Number(values.abdominalPain) +
        Number(values.liquidStools) +
        Number(values.abdominalMass) +
        complicationScore
    );
}

export function validate(values) {
    return {
        wellBeing: values.wellBeing === "",
        abdominalPain: values.abdominalPain === "",
        liquidStools: values.liquidStools === "" || isNaN(values.liquidStools) || Number(values.liquidStools) < 0,
        abdominalMass: values.abdominalMass === "",
        hasComplications: values.hasComplications === ""
    };
}

export function interpret (score) {
    if (score < 5) {
        return "Remission (< 5)";
    }

    if (score <= 7) {
        return "Mildly active disease (5-7)";
    }

    if (score <= 16) {
        return "Moderately active disease (8-16)";
    }

    return "Severely active disease (> 16)";
}

export const referenceValues = [
    "< 5 = remission",
    "5 - 7 = mildly active disease",
    "8 - 16 = moderately active disease",
    "> 16 = severely active disease"
];