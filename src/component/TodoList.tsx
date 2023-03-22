import axios from "axios";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodos } from "../queries/Todos";
import Todo, { TodoType, withCrudTodo } from "./Todo";
import TodoAddForm from "./TodoAddForm";
import styles from './TodoList.module.css';

const TodoList = () => {
    const { data: todos = [] } = useQuery<TodoType[]>("todos", getTodos)
    
    const queryClient = useQueryClient()

    const uncompletedTodos = useMemo(() => todos && todos.filter(t => !t.isCompleted).length, [todos])

    const deleteTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.delete(`${import.meta.env.VITE_BASE_DB_URL}/todos/${todo.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    const setCompletedTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.put(`${import.meta.env.VITE_BASE_DB_URL}/todos/${todo.id}`, {
                ...todo,
                isCompleted: !todo.isCompleted
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    const WithCrudTodo = withCrudTodo(Todo)

    return (
        <div>
            <h2>Todo's</h2>
            <TodoAddForm onSubmit={getTodos} />
            <div className={styles.List}>
                {!todos.length
                    ? <div>Aucune tâche à afficher <span className="success-text">ajoute une tâche !</span></div>
                    : <>
                        <div>{todos.length} | A faire : {uncompletedTodos}</div>
                        {todos.sort(t => t.isCompleted ? 1 : -1).map((todo) => (
                            <WithCrudTodo
                                key={todo.id}
                                todo={todo}
                            />
                        ))}
                    </>
                }
            </div>
        </div>
    );
}

export default TodoList;