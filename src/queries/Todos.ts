import axios from "axios";

export const getTodos = () => axios.get("http://localhost:3000/todos")
    .then((res) => res.data)

export default {
    getTodos
}