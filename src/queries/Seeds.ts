import axios from "axios"

export const getSeeds = () => axios
    .get(`${import.meta.env.VITE_BASE_DB_URL}/seeds`)
    .then((res) => res.data)

export const addSeed =  (newSeed: Partial<SeedType>) => {
    if (newSeed.id) {
        return axios.put(`${import.meta.env.VITE_BASE_DB_URL}/seeds/${newSeed.id}`, newSeed)
    } else {
        return axios.post(`${import.meta.env.VITE_BASE_DB_URL}/seeds/`, newSeed)
    }
}
export default {
    getSeeds,
    addSeed
}