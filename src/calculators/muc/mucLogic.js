export function calculate(values) {
    return 1.4 * Number(values.bwt) + 2 * Number(values.cds);
}

export function validate(values) {
    return {
        bwt: values.bwt === "" || isNaN(values.bwt) || Number(values.bwt) < 0,
        cds: values.cds === ""
    };
}

export function interpret (score) {
    if (score > 6.2 ) {
        return "EMS > 1";
    }

    if (score < 4.3) {
        return "EMS 0";
    }

    return "Intermediate result (4.3 - 6.2)";
}

export const referenceValues = [
    "MUC > 6.2 = EMS > 1",
    "MUC < 4.3 = EMS 0"
];