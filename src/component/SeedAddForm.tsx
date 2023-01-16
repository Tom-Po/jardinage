import axios from "axios";
import { useState } from "react";
import Button from "./Button";
import Seed, { SeedType } from "./Seed";

interface ISeedAddForm {
    onSubmit: Function
}

const initialSeed: SeedType = {
    id: 0,
    growingMonths: [],
    name: '',
    type: 'Aromatiques'
}

const SeedAddForm: React.FC<ISeedAddForm> = ({ onSubmit }) => {
    const [seed, setSeed] = useState(initialSeed)

    const resetSeed = () => setSeed({
        ...seed,
        name: '',
        growingMonths: []
    })

    const setSeedName = (name: string) => {
        setSeed({
            ...seed,
            name
        })
    }

    const toggleGrowingMonth = (_: SeedType, monthIndex: number) => {
        const updatedSeed = { ...seed }
        if (updatedSeed.growingMonths.includes(monthIndex)) {
            updatedSeed.growingMonths.splice(updatedSeed.growingMonths.indexOf(monthIndex), 1)
        } else {
            updatedSeed.growingMonths.push(monthIndex)
        }
        setSeed(updatedSeed)
    }

    const submitSeed = (e: any) => {
        e.preventDefault();
        if (!seed.name) return;
        const newSeed = { ...seed };
        axios.post(`http://localhost:3000/seeds/`, newSeed)
            .then(() => {
                resetSeed()
                onSubmit()
            })
    }

    return (
        <form onSubmit={submitSeed}>
            <div>
                <h4>Nouveau semi</h4>
                <Seed seed={seed} updateSeed={toggleGrowingMonth} noLink displayMonth />
            </div>
            <input type="text" value={seed.name} onSubmit={submitSeed} onChange={(e) => setSeedName(e.target.value)} />
            <Button onClick={submitSeed}>Ajouter</Button>
        </form>
    )
}


export default SeedAddForm