import { useQuery } from 'react-query'
import { ReactComponent as SeedSVG } from '../assets/Seed.svg'
import date from '../constant/Date'
import { getTodos } from '../queries/Todos'
import styles from './CalendarMonth.module.css'
import { SeedType } from './Seed'
import Todo, { TodoType, withCrudTodo } from './Todo'

interface ICalendarMonth {
    name: string,
    availableSeeds: SeedType[]
}
const CalendarMonth: React.FC<ICalendarMonth> = ({ name, availableSeeds }) => {
    const { data: todos = [], isFetching } = useQuery<TodoType[]>("todos", getTodos)

    const currentMonthTodos = todos.filter(todo => {
        return todo.month === date.MONTHS.findIndex(month => month === name)
    }).sort((a, b) => a.isCompleted > b.isCompleted ? 1 : -1)

    const WithCrudTodo = withCrudTodo(Todo)

    if (isFetching) {
        return (
            <div className={styles.Loader}>is fetching ...</div>
        )
    }
    return (
        <div key={name} className={styles.Month}>
            <h3 className={styles.MonthName}>{name}</h3>
            <div className={styles.AvailableSeeds}>
                {availableSeeds.sort((a, b) => a.name > b.name ? 1 : -1).map(seed => (
                    <div key={seed.name} className={styles.Seed}>
                        <div className={styles.Icon}><SeedSVG /></div>
                        <div>{seed.name}</div>
                    </div>
                ))}
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