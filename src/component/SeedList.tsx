import axios from "axios"
import { useEffect, useState } from "react"
import Calendar from "./Calendar";
import Seed, { SeedType } from "./Seed";
import styles from './SeedList.module.css';

const SeedList = () => {
    const [seeds, setSeeds] = useState<SeedType[]>([])
    const getSeeds = () => axios.get("http://localhost:3000/seeds")
        .then((data) => {
            setSeeds(data.data)
            let currentMonthSeeds = data.data.filter((seed: SeedType) => {
                return seed.growingMonths.includes(today.getMonth())
            })
            setAllCurrent(currentMonthSeeds)

        })

    const updateSeedApi = (seed: SeedType) => axios.put(`http://localhost:3000/seeds/${seed.id}`, seed)
        .then(() => getSeeds())

    const updateSeed = (seed: SeedType, monthIndex: number) => {
        let updatedSeed = { ...seed }
        if (updatedSeed.growingMonths.includes(monthIndex)) {
            updatedSeed.growingMonths.splice(updatedSeed.growingMonths.indexOf(monthIndex), 1)
        } else {
            updatedSeed.growingMonths.push(monthIndex)
        }
        updateSeedApi(updatedSeed)
    }

    const deleteSeed = (seed: SeedType) => axios.delete(`http://localhost:3000/seeds/${seed.id}`)
        .then(() => getSeeds())

    useEffect(() => {
        getSeeds()
    }, [])

    const [allCurrent, setAllCurrent] = useState<SeedType[]>([])

    const today = new Date()

    return <>
        <h2>Semis</h2>
        {allCurrent.map(current => (
            <div key={current.id}> current {current.name}</div>
        ))}
        <div className={styles.Seeds}>
            {seeds.map((seed, index) => (
                <Seed key={index} id={index} updateSeed={updateSeed} deleteSeed={deleteSeed} seed={seed} />
            ))}
        </div>
    </>
}


export default SeedList