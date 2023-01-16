import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Todo, { TodoType } from "./Todo";
import styles from './TodoList.module.css'
import Button from "./Button";

const TodoList = () => {
    const [todoContent, setTodoContent] = useState('')
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

    const addTodo = (e: any) => {
        e.preventDefault();
        if (!todoContent) return;
        const newTodo = { text: todoContent, isCompleted: false };
        setTodoContent('')
        axios.post(`http://localhost:3000/todos/`, newTodo)
            .then(() => getTodos())
    }

    return (
        <div>
            <h2>Todo's</h2>
            <form onSubmit={addTodo}>
                <input type="text" value={todoContent} onSubmit={addTodo} onChange={(e) => setTodoContent(e.target.value)} />
                <Button onClick={addTodo}>Ajouter</Button>
            </form>
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