import axios from "axios"
import { useEffect, useState } from "react"
import Seed from "./Seed";
import styles from './SeedList.module.css';

const SeedList = () => {
    const [seeds, setSeeds] = useState<SeedType[]>([])

    const getSeeds = () => axios.get("http://localhost:3000/seeds").then((data) => {
        setSeeds(data.data)
    })

    const updateSeedApi = (index: number, seed: SeedType) => axios.put(`http://localhost:3000/seeds/${index + 1}`, seed).then(() => getSeeds())

    const updateSeed = (index: number, monthIndex: number) => {
        let newSeeds = seeds.slice()

        if (newSeeds[index].growingMonths.includes(monthIndex)) {
            newSeeds[index].growingMonths.splice(newSeeds[index].growingMonths.indexOf(monthIndex), 1)
        } else {
            newSeeds[index].growingMonths.push(monthIndex)
        }

        updateSeedApi(index, newSeeds[index])
    }
    useEffect(() => {
        getSeeds()
    }, [])
    return <div className={styles.Seeds}>
        {seeds.map((seed, index) => (
            <Seed key={index} id={index} updateSeed={updateSeed} seed={seed} />
        ))}
    </div>
}


export default SeedList