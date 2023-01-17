import styles from './CalendarMonth.module.css'
import { SeedType } from './Seed'
import { ReactComponent as SeedSVG } from '../assets/Seed.svg'
import { useQuery } from 'react-query'
import { getTodos } from '../queries/Todos'
import { TodoType } from './Todo'
import date from '../constant/Date'

interface ICalendarMonth {
    name: string,
    availableSeeds: SeedType[]
}
const CalendarMonth: React.FC<ICalendarMonth> = ({ name, availableSeeds }) => {
    const { data: todos = [] } = useQuery<TodoType[]>("todos", getTodos)
    const currentMonthIndex = date.MONTHS.findIndex(month => month === name)

    const currentMonthTodos = todos.filter(todo => {
        return todo.month === currentMonthIndex
    }).sort((a, b) => a.isCompleted > b.isCompleted || a.text > b.text ? 1 : -1)

    return (
        <div key={name} className={styles.Month}>
            <h3 className={styles.MonthName}>{name}</h3>
            <div className={styles.AvailableSeeds}>
                {availableSeeds.map(seed => (
                    <div key={seed.name} className={styles.Seed}>
                        <SeedSVG />
                        <div>{seed.name}</div>
                    </div>
                ))}

            </div>
            {currentMonthTodos.map(todo => (
                <div key={todo.text} className={styles.Seed}>
                    {todo.isCompleted && <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>}
                    <div>{todo.text}</div>
                </div>
            ))}
        </div>
    )
}

export default CalendarMonth