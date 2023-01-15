import Button from './Button';
import styles from './Todo.module.css'

interface ITodo {
    todo: {
        text: string,
        isCompleted: boolean,
    },
    index: number,
    completeTodo: Function,
    removeTodo: Function,
}

const Todo: React.FC<ITodo> = ({ todo, index, completeTodo, removeTodo }) => {
    return (
        <div
            className={`${styles.Todo} ${todo.isCompleted ? styles.Complete : ''}`}
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.text}

            <div>
                {todo.isCompleted
                    ? <Button onClick={() => completeTodo(index)}>
                        Annuler
                    </Button>
                    : <Button onClick={() => completeTodo(index)}>
                        Completer
                    </Button>}
            </div>
            <div className={styles.Remove} onClick={() => removeTodo(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </div>
        </div>
    );
}

export default Todo;