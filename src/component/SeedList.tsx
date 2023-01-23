import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSeeds } from '../queries/Seeds';
import Seed, { SeedType } from "./Seed";
import styles from './SeedList.module.css';

const SeedList = () => {
    const queryClient = useQueryClient()
    const { data: seeds } = useQuery("seeds", getSeeds)

    const update = useMutation({
        mutationFn: (updatedSeed: SeedType) =>
            axios.put(`${import.meta.env.VITE_BASE_DB_URL}/seeds/${updatedSeed.id}`, updatedSeed),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seeds'] })
        },
    })

    const updateSeed = (seed: SeedType, monthIndex: number) => {
        let updatedSeed = { ...seed }
        if (updatedSeed.growingMonths.includes(monthIndex)) {
            updatedSeed.growingMonths.splice(updatedSeed.growingMonths.indexOf(monthIndex), 1)
        } else {
            updatedSeed.growingMonths.push(monthIndex)
        }
        update.mutate(updatedSeed)
    }

    const deleteSeed = useMutation({
        mutationFn: (updatedSeed: SeedType) =>
            axios.delete(`${import.meta.env.VITE_BASE_DB_URL}/seeds/${updatedSeed.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seeds'] })
        },
    })

    return <>
        <h2>Semis</h2>
        <div className={styles.Seeds}>
            {seeds && seeds.length
                ? seeds.map((seed: SeedType, index: number) => (
                    <Seed key={index} id={index} updateSeed={updateSeed} deleteSeed={(seed: SeedType) => deleteSeed.mutate(seed)
                    } seed={seed} />
                ))
                : <div>No seeds</div>}
        </div>
    </>
}


export default SeedList