import styles from './CalendarMonth.module.css'
import { SeedType } from './Seed'
import { ReactComponent as SeedSVG } from '../assets/Seed.svg'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTodos } from '../queries/Todos'
import { TodoType } from './Todo'
import date from '../constant/Date'
import axios from 'axios'

interface ICalendarMonth {
    name: string,
    availableSeeds: SeedType[]
}
const CalendarMonth: React.FC<ICalendarMonth> = ({ name, availableSeeds }) => {
    const { data: todos = [] } = useQuery<TodoType[]>("todos", getTodos)
    const queryClient = useQueryClient()

    const currentMonthTodos = todos.filter(todo => {
        return todo.month === date.MONTHS.findIndex(month => month === name)
    }).sort((a, b) => a.isCompleted > b.isCompleted ? 1 : -1)

    const setCompletedTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.put(`${import.meta.env.VITE_BASE_DB_URL}/todos/${todo.id}`, {
                ...todo,
                isCompleted: !todo.isCompleted
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const completeTodo = (todo: TodoType) => {
        setCompletedTodo.mutate(todo)
    }

    return (
        <div key={name} className={styles.Month}>
            <h3 className={styles.MonthName}>{name}</h3>
            <div className={styles.AvailableSeeds}>
                {availableSeeds.map(seed => (
                    <div key={seed.name} className={styles.Seed}>
                        <div className={styles.Icon}><SeedSVG /></div>
                        <div>{seed.name}</div>
                    </div>
                ))}

            </div>
            <div className={styles.TodoList}>
                {currentMonthTodos.map(todo => (
                    <div key={todo.text} className={`${styles.Seed} ${styles.Todo}`} onClick={() => completeTodo(todo)}>
                        <div className={styles.Todo}>
                            {todo.isCompleted && (
                                <div className={styles.Icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div>{todo.text}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarMonth