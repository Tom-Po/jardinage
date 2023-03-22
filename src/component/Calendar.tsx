import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import date, { ExtendedMonthType } from '../constant/Date'
import styles from './Calendar.module.css'
import { SeedType } from './Seed'
import { getSeeds } from '../queries/Seeds';
import CalendarMonth from './CalendarMonth'
import TodoAddForm from './TodoAddForm'
import Modal from '../screens/ShowModal'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Calendar = () => {
    const [showModal, setShowModal] = useState(false);

    // TODO remove this to make a month handler component and local fetch
    const { data: seeds } = useQuery("seeds", getSeeds)

    const navigate = useNavigate()

    const sorted: ExtendedMonthType[] = (function () {
        let newSort = date.EXTENDED_MONTHS.slice(0);
        if (!seeds) return newSort
        seeds.forEach((seed: SeedType) => {
            seed.growing && seed.growing.forEach(month => {
                const idList = newSort[month].availableSeeds.map(s => s.id);
                if (!idList.includes(seed.id)) {
                    newSort[month].availableSeeds.push(seed)
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