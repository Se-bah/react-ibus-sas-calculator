import IbusSasView from "./ibusSas/IbusSasView";
import MucView from "./muc/MucView";
import PMayoView from "./pMayo/PMayoView";
import HbiView from "./hbi/HbiView";

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
    },
    {
        id: "pmayo",
        name: "pMayo",
        component: PMayoView
    },
    {
        id: "hbi",
        name: "HBI",
        component: HbiView
    }
];