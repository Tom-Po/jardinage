import axios from "axios";

// export const getTodos = () => axios.get(`${import.meta.env.VITE_BASE_DB_URL}/todos`)
//     .then((res) => res.data)

export const getTodos = () => axios({
    method: 'get',
    url: `${import.meta.env.VITE_BASE_DB_URL}/todos`,
    withCredentials: false,
}).then((res) => res.data)

export default {
    getTodos
}