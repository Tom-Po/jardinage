import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const addSeed = useMutation({
        mutationFn: (newSeed: SeedType) =>
            axios.post(`http://localhost:3000/seeds/`, newSeed),
        onSuccess: () => {
            navigate('/seeds')
            queryClient.invalidateQueries({ queryKey: ['seeds'] })
        },
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
        addSeed.mutate(seed)
    }

    return (
        <form onSubmit={submitSeed}>
            <div>
                <h4>Nouveau semi</h4>
                <Seed deleteSeed={() => { }} seed={seed} updateSeed={toggleGrowingMonth} noLink displayMonth />
            </div>
            <input type="text" value={seed.name} onSubmit={submitSeed} onChange={(e) => setSeedName(e.target.value)} />
            <Button onClick={submitSeed}>Ajouter</Button>
        </form>

    )
}


export default SeedAddForm