import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import date, { ExtendedMonthType } from '../constant/Date'
import styles from './Calendar.module.css'
import { SeedType } from './Seed'
import { getSeeds } from '../queries/Seeds';
import CalendarMonth from './CalendarMonth'
import TodoAddForm from './TodoAddForm'
import MyModal from '../screens/ShowModal'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Calendar = () => {
    const [showModal, setShowModal] = useState(false);
    // TODO remove this to make a month handler component and local fetch
    const { data: seeds } = useQuery("seeds", getSeeds)

    const navigate = useNavigate()

    const sorted: ExtendedMonthType[] = useMemo(() => {
        let newSort = date.EXTENDED_MONTHS.slice(0);
        if (seeds) {
            seeds.forEach((seed: SeedType) => {
                seed.growingMonths.forEach(month => {
                    if (!newSort[month].availableSeeds.includes(seed)) {
                        newSort[month].availableSeeds.push(seed)
                    }
                })
            })
        }
        return newSort
    }, [seeds])

    const closeModal = () => setShowModal(false);

    const handleCloseButton = (
        <Button onClick={closeModal}>
            Ajouter
        </Button>
    );

    const addTodo = (
        <MyModal closeModal={closeModal} handleCloseButton={handleCloseButton} noFooter>
            <div className={styles.ModalContent}>
                <h1>Ajouter un todo</h1>
                <TodoAddForm onSubmit={(e: any) => {
                    closeModal()
                }} />
            </div>
        </MyModal>
    );

    return (
        <>
            <h2>Calendrier</h2>
            <Button onClick={() => setShowModal(true)}>Ajouter un Todo</Button>
            <Button onClick={() => navigate("/seeds/create")}>Ajouter une graine</Button>
            <div className={styles.Calendar}>
                {sorted.map(({ name, availableSeeds }) => (
                    <CalendarMonth key={name} name={name} availableSeeds={availableSeeds} />
                ))}
            </div>
            {showModal && addTodo}
        </>
    )
}


export default Calendar