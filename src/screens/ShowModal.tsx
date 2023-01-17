import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css'

type IModal = React.PropsWithChildren & { closeModal: React.MouseEventHandler<HTMLDivElement>, handleCloseButton: React.ReactNode }

const MyModal: React.FC<IModal> = ({ closeModal, children, handleCloseButton }) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.Wrapper}>
            <div className={styles.Backdrop} onClick={closeModal}></div>
            <div className={styles.Modal}>
                {children}
                {handleCloseButton}
            </div>
        </div>,
        document.querySelector("#modal-portal")!
    );
};

export default MyModal;