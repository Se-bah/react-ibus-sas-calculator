import IbusSasView from "./ibusSas/view";
import MucView from "./muc/view";

export const calculators = [
    {
        id: "ibus-sas",
        name: "IBUS-SAS",
        component: IbusSasView
    },
    {
        id: "muc",
        name: "MUC",
        component: MucView
    }
];