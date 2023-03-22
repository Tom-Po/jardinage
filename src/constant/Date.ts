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
    availableSeeds: {
        seeding: SeedType[],
        growing: SeedType[],
        harvest: SeedType[],
    },
}
const EXTENDED_MONTHS: ExtendedMonthType[] = [
    {
        name: "Janvier",
        daysCount: 31,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Février",
        daysCount: 28,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Mars",
        daysCount: 31,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Avril",
        daysCount: 30,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Mai",
        daysCount: 31,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Juin",
        daysCount: 30,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Juillet",
        daysCount: 31,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Aout",
        daysCount: 31,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Septembre",
        daysCount: 30,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Octobre",
        daysCount: 31,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Novembre",
        daysCount: 30,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
    {
        name: "Décembre",
        daysCount: 30,
        availableSeeds: {
            seeding: [],
            growing: [],
            harvest: [],
        },
    },
]

export default {
    MONTHS,
    EXTENDED_MONTHS
}