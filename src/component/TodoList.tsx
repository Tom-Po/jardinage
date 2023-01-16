import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Todo, { TodoType } from "./Todo";
import styles from './TodoList.module.css'
import TodoAddForm from "./TodoAddForm";

const TodoList = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    const uncompletedTodos = useMemo(() => todos.filter(t => !t.isCompleted).length, [todos])

    const getTodos = () => axios.get("http://localhost:3000/todos")
        .then((data) => setTodos(data.data))

    useEffect(() => {
        getTodos();
    }, [])

    const completeTodo = (todo: TodoType) => {
        let updatedTodo = {
            ...todo,
            isCompleted: !todo.isCompleted
        }
        axios.put(`http://localhost:3000/todos/${todo.id}`, updatedTodo)
            .then(() => getTodos())
    };

    const removeTodo = (todo: TodoType) => {
        axios.delete(`http://localhost:3000/todos/${todo.id}`)
            .then(() => getTodos())
    };

    return (
        <div>
            <h2>Todo's</h2>
            <TodoAddForm onSubmit={getTodos} />
            <div className={styles.List}>
                {!todos.length
                    ? <div>Aucune tâche à afficher <span className="success-text">ajoute une tâche !</span></div>
                    : <>
                        <div>{todos.length} | A faire : {uncompletedTodos}</div>
                        {todos.sort(t => t.isCompleted ? 1 : -1).map((todo, index) => (
                            <Todo
                                key={index}
                                todo={todo}
                                completeTodo={completeTodo}
                                removeTodo={removeTodo}
                            />
                        ))}
                    </>
                }
            </div>
        </div>
    );
}

export default TodoList;