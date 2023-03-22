import { useQuery } from 'react-query'
import { ReactComponent as SeedSVG } from '../assets/Seed.svg'
import { ReactComponent as GrowingSVG } from '../assets/Growing.svg'
import { ReactComponent as HarvestSVG } from '../assets/Harvest.svg'
import date from '../constant/Date'
import { getTodos } from '../queries/Todos'
import styles from './CalendarMonth.module.css'
import { SeedType } from './Seed'
import Todo, { TodoType, withCrudTodo } from './Todo'

interface ICalendarMonth {
    name: string,
    availableSeeds: {
        seeding: SeedType[],
        growing: SeedType[],
        harvest: SeedType[],
    }
}
const CalendarMonth: React.FC<ICalendarMonth> = ({ name, availableSeeds }) => {
    const { data: todos = [] } = useQuery<TodoType[]>("todos", getTodos)

    const currentMonthTodos = todos.filter(todo => {
        return todo.month === date.MONTHS.findIndex(month => month === name)
    }).sort((a, b) => a.isCompleted > b.isCompleted ? 1 : -1)

    const WithCrudTodo = withCrudTodo(Todo)
    return (
        <div key={name} className={styles.Month}>
            <h3 className={styles.MonthName}>{name}</h3>
            <div className={styles.AvailableSeeds}>
                <h4 className={styles.PeriodTitle}><SeedSVG /><div>Semis</div></h4>
                {availableSeeds.seeding.sort((a, b) => a.name > b.name ? 1 : -1).map(seed => (
                    <div key={seed.name} className={styles.Seed}>
                        <div className={styles.Icon}></div>
                        <div>{seed.name}</div>
                    </div>
                ))}
                {!availableSeeds.seeding.length && (
                    <div className={styles.Seed}>-</div>
                )}
                <h4 className={styles.PeriodTitle}><GrowingSVG /><div>Culture</div></h4>
                {availableSeeds.growing.sort((a, b) => a.name > b.name ? 1 : -1).map(seed => (
                    <div key={seed.name} className={styles.Seed}>
                        <div className={styles.Icon}></div>
                        <div>{seed.name}</div>
                    </div>
                ))}
                {!availableSeeds.growing.length && (
                    <div className={styles.Seed}>-</div>
                )}
                <h4 className={styles.PeriodTitle}><HarvestSVG /><div>Récolte</div></h4>
                {availableSeeds.harvest.sort((a, b) => a.name > b.name ? 1 : -1).map(seed => (
                    <div key={seed.name} className={styles.Seed}>
                        <div className={styles.Icon}></div>
                        <div>{seed.name}</div>
                    </div>
                ))}
                {!availableSeeds.harvest.length && (
                    <div className={styles.Seed}>-</div>
                )}
            </div>
            <div className={styles.TodoList}>
                {currentMonthTodos.map(todo => (
                    <WithCrudTodo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    )
}

export default CalendarMonth