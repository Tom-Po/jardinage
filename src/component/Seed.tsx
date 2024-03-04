import { useState } from 'react';
import { ReactComponent as Edit } from '../assets/Edit.svg';
import { ReactComponent as Rustica } from '../assets/RusticaNoir.svg';
import { ReactComponent as TrashBin } from '../assets/TrashBin.svg';
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
    // Period represented by month index
    seeding: number[],
    // Period represented by month index
    growing: number[],
    // Period represented by month index
    harvest: number[],
    image?: string,
    images?: string[]
}

interface ISeed {
    seed: SeedType,
    noLink?: boolean,
    id?: number,
    displayMonth?: boolean,
    deleteSeed: Function,
}

const Seed: React.FC<ISeed> = ({ id = 0, seed, displayMonth = false, noLink = false, deleteSeed }) => {
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

    if (!seed || !seed.name) {
        debugger;

    }

    return (
        <div className={styles.Seed}>
            {seed.image && (
                <div className={styles.Display}>
                    <img src={seed.image} />
                </div>
            )}
            {showModal && editSeedModal}

            <div className={styles.Content}>
                <h3>{seed.name}</h3>
                <p className={`${styles.Description} ${!seed.description && styles.disabled}`}>{seed.description ?? "Pas de description"}</p>

                {!noLink && (
                    <a className={styles.ExtLink} target="_blank" href={`https://www.rustica.fr/recherche.html?recherche=${seed.name.split(' ').join('+')}`}>
                        <Rustica />
                    </a>
                )}
            </div>
            <div className={styles.Actions}>
                <Edit onClick={() => setShowModal(true)} />
                <TrashBin onClick={() => deleteSeed(seed)} />
            </div>
        </div >
    )
}

export default Seed