import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "./Button";
import { TodoType } from "./Todo";

interface ITodoAddForm {
    onSubmit: Function
}

const TodoAddForm: React.FC<ITodoAddForm> = ({ onSubmit }) => {
    const [todoContent, setTodoContent] = useState('')

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
        addTodoMutation.mutate({ text: todoContent, isCompleted: false })
    }

    return (
        <form onSubmit={addTodo}>
            <input type="text" value={todoContent} onSubmit={addTodo} onChange={(e) => setTodoContent(e.target.value)} />
            <Button onClick={addTodo}>Ajouter</Button>
        </form>
    )
}

export default TodoAddForm