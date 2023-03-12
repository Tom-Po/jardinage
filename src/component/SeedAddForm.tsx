import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import date from '../constant/Date';
import Button from "./Button";
import { SeedType, SEED_TYPE } from "./Seed";
import styles from './SeedAddForm.module.css';


// Comment
interface ISeedAddForm {
    onSubmit: Function,
    init?: Omit<SeedType, "id"> & { id?: number }
}

const initialSeed: SeedType = {
    id: 0,
    growingMonths: [],
    name: '',
    description: '',
    type: SEED_TYPE.AROMATIQUE
}

const SeedAddForm: React.FC<ISeedAddForm> = ({ onSubmit, init = { ...initialSeed, id: 0 } }) => {
    const [seed, setSeed] = useState(init)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const addSeed = useMutation({
        mutationFn: (newSeed: Partial<SeedType>) => {
            if (newSeed.id) {
                return axios.put(`${import.meta.env.VITE_BASE_DB_URL}/seeds/${newSeed.id}`, newSeed)
            } else {
                return axios.post(`${import.meta.env.VITE_BASE_DB_URL}/seeds/`, newSeed)
            }
        },
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

    const toggleGrowingMonth = (_: Omit<SeedType, "id">, monthIndex: number) => {
        const updatedSeed = { ...seed }
        if (updatedSeed.growingMonths.includes(monthIndex)) {
            updatedSeed.growingMonths.splice(updatedSeed.growingMonths.indexOf(monthIndex), 1)
        } else {
            updatedSeed.growingMonths.push(monthIndex)
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
        addSeed.mutate(newSeed)
    }
    return (
        <form onSubmit={submitSeed} className={styles.Form}>
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