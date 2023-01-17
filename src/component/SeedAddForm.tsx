import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import date from '../constant/Date';
import Button from "./Button";
import { SeedType, SEED_TYPE } from "./Seed";
import styles from './SeedAddForm.module.css';

interface ISeedAddForm {
    onSubmit: Function,
    init?: Omit<SeedType, "id">
}

const initialSeed: Omit<SeedType, "id"> = {
    growingMonths: [],
    name: '',
    description: '',
    type: SEED_TYPE.AROMATIQUE
}

const SeedAddForm: React.FC<ISeedAddForm> = ({ onSubmit, init = initialSeed }) => {
    const [seed, setSeed] = useState(init)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const addSeed = useMutation({
        mutationFn: (newSeed: Omit<SeedType, "id">) =>
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
    const setSeedDescription = (description: string) => {
        setSeed({
            ...seed,
            description
        })
    }

    const toggleGrowingMonth = (_: Omit<SeedType, "id">, monthIndex: number) => {
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
            </div>
            <div>
                <div>Nom de la graine</div>
                <input type="text" name="seed" value={seed.name} onSubmit={submitSeed} onChange={(e) => setSeedName(e.target.value)} />
            </div>
            <div>
                <div>Notes:</div>
                <textarea name="description" id="description" value={seed.description} onChange={(e) => setSeedDescription(e.target.value)}></textarea>
            </div>
            <div>
                <div>Mois de pousse</div>
                <div className={styles.Months}>
                    {date.MONTHS.map((month, i) => (
                        <div key={i} onClick={() => toggleGrowingMonth(seed, i)} className={`${styles.Month} ${seed.growingMonths.includes(i) && styles.Active} `}>
                            {month.slice(0, 3)}.
                        </div>
                    ))}
                </div>
            </div>
            <Button onClick={submitSeed}>Ajouter</Button>
        </form>
    )
}


export default SeedAddForm