import { useMemo } from 'react'
import { useQuery } from 'react-query'
import date, { ExtendedMonthType } from '../constant/Date'
import styles from './Calendar.module.css'
import { SeedType } from './Seed'
import { getSeeds } from '../queries/Seeds';

const Calendar = () => {
    const { data: seeds } = useQuery("seeds", getSeeds)

    const sorted: ExtendedMonthType[] = useMemo(() => {
        let newSort = date.EXTENDED_MONTHS.slice(0);
        if (seeds) {
            seeds.forEach((seed: SeedType) => {
                seed.growingMonths.forEach(month => {
                    if (!newSort[month].availableSeeds.includes(seed)) {
                        newSort[month].availableSeeds.push(seed)
                    }
                })
            })

        }
        return newSort
    }, [seeds])

    return (
        <>
            <h2>Calendrier</h2>
            <div className={styles.Calendar}>
                {sorted.map(({ name, availableSeeds }) => (
                    <div key={name} className={styles.Month}>
                        <h3 className={styles.MonthName}>{name}</h3>
                        <div className={styles.AvailableSeeds}>
                            <div>Graines: </div>
                            {availableSeeds.map(seed => (
                                <div key={seed.name}>{seed.name}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default Calendar