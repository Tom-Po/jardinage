import axios from "axios";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodos } from "../queries/Todos";
import Todo, { TodoType } from "./Todo";
import TodoAddForm from "./TodoAddForm";
import styles from './TodoList.module.css';

const TodoList = () => {
    const { data: todos = [] } = useQuery<TodoType[]>("todos", getTodos)
    const queryClient = useQueryClient()

    const uncompletedTodos = useMemo(() => todos && todos.filter(t => !t.isCompleted).length, [todos])

    const deleteTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.delete(`http://localhost:3000/todos/${todo.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    const setCompletedTodo = useMutation({
        mutationFn: (todo: TodoType) =>
            axios.put(`http://localhost:3000/todos/${todo.id}`, {
                ...todo,
                isCompleted: !todo.isCompleted
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

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
                                completeTodo={(todo) => setCompletedTodo.mutate(todo)}
                                removeTodo={(todo) => deleteTodo.mutate(todo)}
                            />
                        ))}
                    </>
                }
            </div>
        </div>
    );
}

export default TodoList;