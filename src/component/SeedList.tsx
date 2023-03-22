import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSeeds } from '../queries/Seeds';
import Seed, { SeedType } from "./Seed";
import styles from './SeedList.module.css';
import { ReactComponent as Export } from '../assets/Export.svg';

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

    const exportAllSeeds = () => {
        let header = ''
        const cleanedObjects = seeds.map((s: SeedType) => {
            delete s.images
            if (!header.length) {
                header = Object.keys(s).map(key => key).join(',') + '\n'
            }
            return Object.values(s).map(value => Array.isArray(value) ? value.join('|') : value)
        }).sort((a: any, b: any) => a.id > b.id)

        let csvContent = "data:text/csv;charset=utf-8,"
            + header
            + cleanedObjects.map((e: any) => e.join(",")).join("\n");
        let encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }

    return (
        <div className={styles.Seeds}>
            {seeds && seeds.length
                ? seeds.sort((a: SeedType, b: SeedType) => a.name > b.name).map((seed: SeedType, index: number) => (
                    <Seed key={index} id={index} updateSeed={updateSeed} deleteSeed={(seed: SeedType) => deleteSeed.mutate(seed)
                    } seed={seed} />
                ))
                : <div>No seeds</div>}
            {seeds && (
                <div className={styles.ExportButton} onClick={exportAllSeeds}>
                    <Export />
                </div>
            )}
        </div>
    )
}


export default SeedList