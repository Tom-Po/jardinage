import axios from "axios"
import { useEffect, useState } from "react"
import Seed, { SeedType } from "./Seed";
import styles from './SeedList.module.css';

const SeedList = () => {
    const [seeds, setSeeds] = useState<SeedType[]>([])

    const getSeeds = () => axios.get("http://localhost:3000/seeds").then((data) => {
        setSeeds(data.data)
    })

    const updateSeedApi = (seed: SeedType) => axios.put(`http://localhost:3000/seeds/${seed.id}`, seed)
        .then(() => getSeeds())

    const updateSeed = (seed: SeedType, monthIndex: number) => {
        let updatedSeed = { ...seed }
        console.log(updatedSeed.growingMonths);

        if (updatedSeed.growingMonths.includes(monthIndex)) {
            updatedSeed.growingMonths.splice(updatedSeed.growingMonths.indexOf(monthIndex), 1)
        } else {
            updatedSeed.growingMonths.push(monthIndex)
        }

        updateSeedApi(updatedSeed)
    }

    useEffect(() => {
        getSeeds()
    }, [])

    return <>
        <h2>Seeds</h2>
        <div className={styles.Seeds}>
            {seeds.map((seed, index) => (
                <Seed key={index} id={index} updateSeed={updateSeed} seed={seed} />
            ))}
        </div>
    </>
}


export default SeedList