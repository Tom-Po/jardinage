import { useState } from 'react'
import date, { ExtendedMonthType } from '../constant/Date'
import styles from './Calendar.module.css'
import { SeedType } from './Seed'
import CalendarMonth from './CalendarMonth'
import TodoAddForm from './TodoAddForm'
import Modal from '../screens/ShowModal'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useGetAllSeedsQuery } from '../redux/seedsApi'

const Calendar = () => {
    const [showModal, setShowModal] = useState(false);
    // TODO remove this to make a month handler component and local fetch
    const navigate = useNavigate()
    // Using a query hook automatically fetches data and returns query values
    const { data: seeds, error, isLoading } = useGetAllSeedsQuery({});

    const sorted: ExtendedMonthType[] = (function () {
        let newSort = date.EXTENDED_MONTHS.slice(0);
        if (!seeds) return newSort
        seeds.forEach((seed: SeedType) => {
            seed.seeding && seed.seeding.forEach(month => {
                const idList = newSort[month].availableSeeds.seeding.map(s => s.id);
                if (!idList.includes(seed.id)) {
                    newSort[month].availableSeeds.seeding.push(seed)
                }
            })
            seed.growing && seed.growing.forEach(month => {
                const idList = newSort[month].availableSeeds.growing.map(s => s.id);
                if (!idList.includes(seed.id)) {
                    newSort[month].availableSeeds.growing.push(seed)
                }
            })
            seed.harvest && seed.harvest.forEach(month => {
                const idList = newSort[month].availableSeeds.harvest.map(s => s.id);
                if (!idList.includes(seed.id)) {
                    newSort[month].availableSeeds.harvest.push(seed)
                }
            })
        })
        return newSort
    })();

    const closeModal = () => setShowModal(false);

    const handleCloseButton = (
        <Button onClick={closeModal}>
            Ajouter
        </Button>
    );

    const addTodo = (
        <Modal closeModal={closeModal} handleCloseButton={handleCloseButton} noFooter>
            <div className={styles.ModalContent}>
                <h1>Ajouter un todo</h1>
                <TodoAddForm onSubmit={(e: any) => {
                    closeModal()
                }} />
            </div>
        </Modal>
    );

    return (
        <>
            <Button onClick={() => setShowModal(true)}> Ajouter un Todo</Button >
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