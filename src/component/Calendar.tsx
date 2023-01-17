import axios from 'axios'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import date, { ExtendedMonthType } from '../constant/Date'
import styles from './Calendar.module.css'
import { SeedType } from './Seed'

const Calendar = () => {
    const { data } = useQuery({
        queryKey: ["seeds"],
        queryFn: () =>
            axios
                .get("http://localhost:3000/seeds")
                .then((res) => res.data),
    });

    const sorted: ExtendedMonthType[] = useMemo(() => {
        let newSort = date.EXTENDED_MONTHS.slice(0);
        if (data) {
            data.forEach((seed: SeedType) => {
                seed.growingMonths.forEach(month => {
                    if (!newSort[month].availableSeeds.includes(seed)) {
                        newSort[month].availableSeeds.push(seed)
                    }
                })
            })

        }
        return newSort
    }, [data])

    return (
        <div className={styles.Calendar}>
            {sorted.map(({ name, daysCount, availableSeeds }) => (
                <div key={name} className={styles.Month}>
                    <h3 className={styles.MonthName}>{name}</h3>
                    {Array(daysCount).fill(null).map((_, i) => (
                        <div key={`calendar-${name}-day-${i}`} className={styles.Day}>
                            <div className={styles.DayIndex}>{i}</div>
                            <div className={styles.DayContent}>{availableSeeds[i] ? availableSeeds[i].name : ""}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}


export default Calendar