import { SeedType } from "../component/Seed"

const MONTHS = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
]
export type ExtendedMonthType = {
    name: string,
    daysCount: number,
    availableSeeds: SeedType[]
}
const EXTENDED_MONTHS: ExtendedMonthType[] = [
    {
        name: "Janvier",
        daysCount: 31,
        availableSeeds: [],
    },
    {
        name: "Février",
        daysCount: 28,
        availableSeeds: [],
    },
    {
        name: "Mars",
        daysCount: 31,
        availableSeeds: [],
    },
    {
        name: "Avril",
        daysCount: 30,
        availableSeeds: [],
    },
    {
        name: "Mai",
        daysCount: 31,
        availableSeeds: [],
    },
    {
        name: "Juin",
        daysCount: 30,
        availableSeeds: [],
    },
    {
        name: "Juillet",
        daysCount: 31,
        availableSeeds: [],
    },
    {
        name: "Aout",
        daysCount: 31,
        availableSeeds: [],
    },
    {
        name: "Septembre",
        daysCount: 30,
        availableSeeds: [],
    },
    {
        name: "Octobre",
        daysCount: 31,
        availableSeeds: [],
    },
    {
        name: "Novembre",
        daysCount: 30,
        availableSeeds: [],
    },
    {
        name: "Décembre",
        daysCount: 30,
        availableSeeds: [],
    },
]

export default {
    MONTHS,
    EXTENDED_MONTHS
}