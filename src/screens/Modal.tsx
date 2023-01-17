import { useState } from "react";
import Button from "../component/Button";
import { SEED_TYPE } from "../component/Seed";
import SeedAddForm from "../component/SeedAddForm";
import MyModal from "./ShowModal";

const Modal = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const handleCloseButton = (
        <Button onClick={closeModal}>
            Accept It
        </Button>
    );

    const mainModal = (
        <MyModal closeModal={closeModal} handleCloseButton={handleCloseButton}>
            <SeedAddForm init={{
                "growingMonths": [
                    3,
                    2,
                    8,
                    9,
                    10,
                    0
                ],
                "name": "Carotte",
                "description": "Orange",
                "type": SEED_TYPE['AROMATIQUE']
            }} onSubmit={closeModal} />
        </MyModal>
    );

    return (
        <>
            <Button onClick={() => setShowModal(true)}>
                Open Modal
            </Button>
            {showModal && mainModal}
        </>
    );
};

export default Modal;