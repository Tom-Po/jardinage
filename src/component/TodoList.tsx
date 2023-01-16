import axios from "axios";
import { useEffect, useState } from "react";
import Todo, { TodoType } from "./Todo";

const TodoList = () => {
    const [todoContent, setTodoContent] = useState('')
    const [todos, setTodos] = useState<TodoType[]>([]);

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
        const newTodo = { text: todoContent, isCompleted: false };
        setTodoContent('')
        axios.post(`http://localhost:3000/todos/`, newTodo)
            .then(() => getTodos())
    }

    if (!todos.length) {
        return (
            <>
                <div>Aucune tâche à afficher</div>
                <form onSubmit={addTodo}>
                    <input type="text" value={todoContent} onSubmit={addTodo} onChange={(e) => setTodoContent(e.target.value)} />
                    <button onClick={addTodo}>Ajouter</button>
                </form>
            </>
        )
    }

    return (
        <div className="app">
            <form onSubmit={addTodo}>
                <input type="text" value={todoContent} onSubmit={addTodo} onChange={(e) => setTodoContent(e.target.value)} />
                <button onClick={addTodo}>Ajouter</button>
            </form>
            {todos.sort(t => t.isCompleted ? 1 : -1).map((todo, index) => (
                <Todo
                    key={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
}

export default TodoList;