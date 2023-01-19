import axios from "axios"

export const getSeeds = () => axios
    .get(`${import.meta.env.VITE_BASE_DB_URL}/seeds`)
    .then((res) => res.data)

export default {
    getSeeds
}