import styles from './SeedCalendar.module.css'
import date from '../constant/Date';

interface ISeedCalendar {
    periods: number[][],
    toggleSeedingMonth: Function,
    toggleGrowingMonth: Function,
    toggleHarvestMonth: Function,
}

const SeedCalendar: React.FC<ISeedCalendar> = ({
    periods,
    toggleSeedingMonth,
    toggleGrowingMonth,
    toggleHarvestMonth
    }) => {

    const [seeding, growing, harvest] = periods;

    return (
        <div className={styles.MonthList}>
                <div>
                    <div>Semis</div>
                    <div className={styles.Months}>
                        {date.MONTHS.map((month, i) => (
                            <div
                                key={i}
                                onClick={() => toggleSeedingMonth(i)}
                                className={`${styles.Month} ${seeding.includes(i) && styles.Active} `}>
                                {month.slice(0, 3)}.
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div>Plantation</div>
                    <div className={styles.Months}>
                        {date.MONTHS.map((month, i) => (
                            <div
                                key={i}
                                onClick={() => toggleGrowingMonth(i)}
                                className={`${styles.Month} ${growing.includes(i) && styles.Active} `}>
                                {month.slice(0, 3)}.
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div>Récolte</div>
                    <div className={styles.Months}>
                        {date.MONTHS.map((month, i) => (
                            <div
                                key={i}
                                onClick={() => toggleHarvestMonth(i)}
                                className={`${styles.Month} ${harvest.includes(i) && styles.Active} `}>
                                {month.slice(0, 3)}.
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default SeedCalendar