import axios from "axios";
import { useState } from "react";
import Button from "./Button";

interface ITodoAddForm {
    onSubmit: Function
}

const TodoAddForm: React.FC<ITodoAddForm> = ({ onSubmit }) => {
    const [todoContent, setTodoContent] = useState('')

    const addTodo = (e: any) => {
        e.preventDefault();
        if (!todoContent) return;
        const newTodo = { text: todoContent, isCompleted: false };
        setTodoContent('')
        axios.post(`http://localhost:3000/todos/`, newTodo)
            .then(() => onSubmit())
    }
    return (
        <form onSubmit={addTodo}>
            <input type="text" value={todoContent} onSubmit={addTodo} onChange={(e) => setTodoContent(e.target.value)} />
            <Button onClick={addTodo}>Ajouter</Button>
        </form>
    )
}

export default TodoAddForm