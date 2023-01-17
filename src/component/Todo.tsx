import Button from './Button';
import styles from './Todo.module.css'

export type TodoType = {
    id: number,
    text: string,
    isCompleted: boolean,
}

interface ITodo {
    todo: TodoType,
    completeTodo: (todo: TodoType) => void,
    removeTodo: (todo: TodoType) => void,
}

const Todo: React.FC<ITodo> = ({ todo, completeTodo, removeTodo }) => {
    return (
        <div
            className={`${styles.Todo} ${todo.isCompleted ? styles.Complete : ''}`}
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.text}
            <div>
                <Button onClick={() => completeTodo(todo)}>
                    {todo.isCompleted
                        ? "Annuler"
                        : "Completer"
                    }
                </Button>
            </div>
            <div className={styles.Remove} onClick={() => removeTodo(todo)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </div>
        </div>
    );
}

export default Todo;