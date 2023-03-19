import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { addSeed } from "../queries/Seeds";
import Button from "./Button";
import { SeedType, SEED_TYPE } from "./Seed";
import styles from './SeedAddForm.module.css';
import SeedCalendar from "./SeedCalendar";


// Comment
interface ISeedAddForm {
    onSubmit: Function,
    init?: Omit<SeedType, "id"> & { id?: number }
}

const initialSeed: SeedType = {
    id: 0,
    growingMonths: [],
    growing: [],
    seeding: [],
    harvest: [],
    name: '',
    description: '',
    type: SEED_TYPE.AROMATIQUE
}

const SeedAddForm: React.FC<ISeedAddForm> = ({ onSubmit, init = { ...initialSeed, id: 0 } }) => {
    const [seed, setSeed] = useState(init)

    const seeding = seed.seeding || []
    const growing = seed.growing || []
    const harvest = seed.harvest || []
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createSeed = useMutation({
        mutationFn: addSeed,
        onSuccess: () => {
            navigate('/seeds')
            queryClient.invalidateQueries({ queryKey: ['seeds'] })
            onSubmit()
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

    const toggleSeedingMonth = (monthIndex: number) => {
        const updatedSeed = { ...seed }
        if (updatedSeed.seeding.includes(monthIndex)) {
            updatedSeed.seeding.splice(updatedSeed.seeding.indexOf(monthIndex), 1)
        } else {
            updatedSeed.seeding.push(monthIndex)
        }
        setSeed(updatedSeed)
    }
    const toggleGrowingMonth = (monthIndex: number) => {
        const updatedSeed = { ...seed }
        if (updatedSeed.growing.includes(monthIndex)) {
            updatedSeed.growing.splice(updatedSeed.growing.indexOf(monthIndex), 1)
        } else {
            updatedSeed.growing.push(monthIndex)
        }
        setSeed(updatedSeed)
    }

    const toggleHarvestMonth = (monthIndex: number) => {
        const updatedSeed = { ...seed }
        if (updatedSeed.harvest.includes(monthIndex)) {
            updatedSeed.harvest.splice(updatedSeed.harvest.indexOf(monthIndex), 1)
        } else {
            updatedSeed.harvest.push(monthIndex)
        }
        setSeed(updatedSeed)
    }

    const submitSeed = async (e: any) => {
        e.preventDefault();
        if (!seed.name) return;

        let newSeed = { ...seed }

        let images: any = null;
        try {
            images = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: import.meta.env.VITE_API_GOOGLE,
                    cx: import.meta.env.VITE_CX_ID,
                    q: seed.name,
                    searchType: 'image',
                    num: 1
                }
            })
        } catch (e) {
            console.log(e);
        }

        if (images && images.data.items && images.data.items.length) {
            newSeed.image = images.data.items[0].link
            newSeed.images = images.data.items
        }
        createSeed.mutate(newSeed)
    }
    
    return (
        <form onSubmit={submitSeed} className={styles.Form}>
            <div>
                <div>Nom de la graine</div>
                <input
                    type="text"
                    name="seed"
                    value={seed.name}
                    onSubmit={submitSeed}
                    onChange={(e) => setSeedName(e.target.value)}
                />
            </div>
            <div>
                <div>Notes:</div>
                <textarea
                    name="description"
                    id="description"
                    value={seed.description}
                    onChange={(e) => setSeedDescription(e.target.value)}
                ></textarea>
            </div>
            <SeedCalendar
                periods={[seeding, growing, harvest]} 
                toggleSeedingMonth={toggleSeedingMonth} 
                toggleGrowingMonth={toggleGrowingMonth} 
                toggleHarvestMonth={toggleHarvestMonth} 
             />
            {seed.image && (
                <div className={styles.Display}>
                    <img src={seed.image} />
                </div>
            )}
            <div className={styles.Actions}>
                <Button onClick={submitSeed}>Ajouter</Button>
            </div>
        </form>
    )
}


export default SeedAddForm