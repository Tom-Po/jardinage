// Seed 

// Peut avoir plusieurs mois d'associés avec un vide entre deux 
// tomate choux courge aromatiques (plantes potagères  aka tout le reste)

import { useState } from 'react';
import MONTHS from '../constant/Date';
import Button from './Button';
import styles from './Seed.module.css';
import { ReactComponent as TrashBin } from '../assets/TrashBin.svg';
import { ReactComponent as Rustica } from '../assets/RusticaNoir.svg';

export type SeedType = {
    id: number,
    name: string,
    type: 'Tomate' | 'Choux' | 'Courge' | 'Aromatiques' | 'Plantes potagères',
    growingMonths: number[]
}

interface ISeed {
    seed: SeedType,
    noLink?: boolean,
    id?: number,
    displayMonth?: boolean,
    updateSeed: Function,
    deleteSeed: Function,
}

const Seed: React.FC<ISeed> = ({ id = 0, seed, updateSeed, displayMonth = false, noLink = false, deleteSeed }) => {
    const [showMonths, setShowMonths] = useState(displayMonth)
    return (
        <div className={styles.Seed}>
            {seed.name && (
                <>
                    <h3 onClick={() => setShowMonths(!showMonths)}>{seed.name}</h3>
                    <div className={styles.Delete}>
                        <TrashBin onClick={() => deleteSeed(seed)} />
                    </div>
                </>
            )}
            {showMonths && (
                <div className={styles.Months}>
                    {MONTHS.MONTHS.map((month, i) => (
                        <div key={i} onClick={() => updateSeed(seed, i)} className={`${styles.Month} ${seed.growingMonths.includes(i) && styles.Active} `}>
                            {month.slice(0, 3)}.
                        </div>
                    ))}
                </div>
            )}
            {!noLink && (
                <a className={styles.ExtLink} target="_blank" href={`https://www.rustica.fr/recherche.html?recherche=${seed.name.split(' ').join('+')}`}>
                    <Rustica />
                </a>
            )}
        </div >
    )
}

export default Seed