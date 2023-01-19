import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import date from '../constant/Date';
import Button from "./Button";
import { TodoType } from "./Todo";
import styles from './SeedAddForm.module.css';

interface ITodoAddForm {
    onSubmit: Function
}

const TodoAddForm: React.FC<ITodoAddForm> = ({ onSubmit }) => {
    const [todoContent, setTodoContent] = useState('')
    const [month, setMonth] = useState(0)

    const queryClient = useQueryClient();

    const addTodoMutation = useMutation({
        mutationFn: (newTodo: Omit<TodoType, "id">) =>
            axios.post(`http://localhost:3000/todos/`, newTodo),
        onSuccess: () => {
            setTodoContent('')
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const addTodo = (e: any) => {
        e.preventDefault();
        if (!todoContent) return;
        addTodoMutation.mutate({ text: todoContent, isCompleted: false, month })
    }

    const handleMonth = (e: any) => {
        setMonth(date.MONTHS.findIndex(m => m === e.target.value))
    }

    return (
        <form onSubmit={addTodo} className={styles.Form}>
            <input type="text" value={todoContent} onSubmit={addTodo} onChange={(e) => setTodoContent(e.target.value)} />
            <select onChange={handleMonth}>
                {date.MONTHS.map(month => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            <Button onClick={addTodo}>Ajouter</Button>
        </form >
    )
}

export default TodoAddForm