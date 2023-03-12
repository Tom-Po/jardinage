import { useState } from 'react';
import { ReactComponent as Edit } from '../assets/Edit.svg';
import { ReactComponent as Rustica } from '../assets/RusticaNoir.svg';
import { ReactComponent as TrashBin } from '../assets/TrashBin.svg';
import MONTHS from '../constant/Date';
import Modal from '../screens/ShowModal';
import Button from './Button';
import styles from './Seed.module.css';
import SeedAddForm from './SeedAddForm';

export enum SEED_TYPE {
    TOMATE = 'Tomate',
    CHOUX = 'Choux',
    COURGE = 'Courge',
    AROMATIQUE = 'Aromatiques',
    POTAGERE = 'Plantes potagères',
}

export type SeedType = {
    id: number,
    name: string,
    description: string,
    type: SEED_TYPE,
    growingMonths: number[],
    image?: string,
    images?: string[]
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
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const handleCloseButton = (
        <Button onClick={closeModal}>
            Mettre à jour
        </Button>
    );

    const editSeedModal = (
        <Modal closeModal={closeModal} handleCloseButton={handleCloseButton} noFooter>
            <SeedAddForm init={seed} onSubmit={(e: any) => {
                closeModal()
            }} />
        </Modal>
    );

    return (
        <div className={styles.Seed}>
            <h3 onClick={() => setShowMonths(!showMonths)}>{seed.name}</h3>
            <p className={`${styles.Description} ${!seed.description && styles.disabled}`}>{seed.description ?? "Pas de description"}</p>
            <div className={styles.Delete}>
                <Edit onClick={() => setShowModal(true)} />
                <TrashBin onClick={() => deleteSeed(seed)} />
            </div>
            {showModal && editSeedModal}
            {showMonths && (
                <div className={styles.Months}>
                    {MONTHS.MONTHS.map((month, i) => (
                        <div key={i} onClick={() => updateSeed(seed, i)} className={`${styles.Month} ${seed.growingMonths.includes(i) && styles.Active} `}>
                            {month.slice(0, 3)}.
                        </div>
                    ))}
                </div>
            )}
            {seed.image && (
                <div className={styles.Display}>
                    <img src={seed.image} />
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