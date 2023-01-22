import styles from './Todo.module.css'
import { ReactComponent as TrashbinSVG } from '../assets/Trashbin.svg'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export type TodoType = {
    id: number,
    text: string,
    isCompleted: boolean,
    month: number
}

interface ITodo {
    todo: TodoType,
    completeTodo: (todo: TodoType) => void,
    deleteTodo: (todo: TodoType) => void,
}

export const withCrudTodo = (Component: React.FC<ITodo>) => {
    const queryClient = useQueryClient()
    const deleteTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.delete(`${import.meta.env.VITE_BASE_DB_URL}/todos/${todo.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    const completeTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.put(`${import.meta.env.VITE_BASE_DB_URL}/todos/${todo.id}`, {
                ...todo,
                isCompleted: !todo.isCompleted
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    return (props: any) => <Component {...props} completeTodo={completeTodo.mutate} deleteTodo={deleteTodo.mutate} />
}

const Todo: React.FC<ITodo> = ({ todo, completeTodo = () => { }, deleteTodo = () => { } }) => {
    return (
        <div key={todo.id} className={`${styles.Todo}`}>
            {todo.isCompleted && (
                <div className={styles.Icon} onClick={() => completeTodo(todo)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            )}
            <div className={styles.TodoContent} onClick={() => completeTodo(todo)}>{todo.text}</div>
            <div className={styles.Remove} onClick={() => deleteTodo(todo)}>
                <TrashbinSVG />
            </div>
        </div >
    )
}

export default Todo;