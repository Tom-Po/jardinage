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
                return axios.put(`http://localhost:3000/seeds/${newSeed.id}`, newSeed)
            } else {
                return axios.post(`http://localhost:3000/seeds/`, newSeed)
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

    const submitSeed = (e: any) => {
        e.preventDefault();
        if (!seed.name) return;

        axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: import.meta.env.VITE_API_GOOGLE,
                cx: import.meta.env.VITE_CX_ID,
                q: seed.name,
                searchType: 'image',
                num: 1
            }
        }).then(response => {
            // Extract the first image result from the API response
            if (!response.data.items.length) {
                addSeed.mutate(seed)
            } else {
                addSeed.mutate({
                    ...seed,
                    image: response.data.items[0].link,
                    images: [...response.data.items]
                })
            }
        })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <form onSubmit={submitSeed} className={styles.Form}>
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