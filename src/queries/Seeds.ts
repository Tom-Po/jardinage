import axios from "axios"

export const getSeeds = () => axios
    .get("http://localhost:3000/seeds")
    .then((res) => res.data)

export default {
    getSeeds
}