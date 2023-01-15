import { useState } from "react";
import Button from "./Button";
import Todo from "./Todo";

const TodoList = () => {
    const [todoContent, setTodoContent] = useState('')
    const [todos, setTodos] = useState([
        {
            text: "Retourner la terre",
            isCompleted: false
        },
        {
            text: "Aller chercher du fumier",
            isCompleted: false
        },
        {
            text: "Planter des radis",
            isCompleted: false
        }
    ]);

    const completeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const removeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const addTodo = (e: any) => {
        e.preventDefault();
        setTodoContent('')
        setTodos(
            [{ text: todoContent, isCompleted: false }, ...todos]
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
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
}

export default TodoList;