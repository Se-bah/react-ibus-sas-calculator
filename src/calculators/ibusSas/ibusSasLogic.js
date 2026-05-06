export function calculate(values) {
    return (
        4 * Number(values.bwt) +
        15 * Number(values.ifat) +
        7 * Number(values.cds) +
        4 * Number(values.bws)
    );
}

export function validate(values) {
    return {
        bwt: values.bwt === "" || isNaN(values.bwt) || Number(values.bwt) < 0,
        ifat: values.ifat === "",
        cds: values.cds === "",
        bws: values.bws === ""
    };
}

export function interpret(score) {
    if (score < 25) {
        return "Remission (< 25)";
    }

    if (score > 48.7) {
        return "Active disease (> 48.7)";
    }

    return "Intermediate result (25 – 48.7)";
}

export const referenceValues = [
    "< 25 = cut-off for remission",
    "25 – 48.7 = intermediate result",
    "> 48.7 = active disease"
];