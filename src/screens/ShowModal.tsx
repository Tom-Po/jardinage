import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css'
import { ReactComponent as CloseButton } from '../assets/Close.svg';

type IModal = React.PropsWithChildren & {
    closeModal: any,
    handleCloseButton: React.ReactNode,
    noFooter?: boolean
}

const Modal: React.FC<IModal> = ({ closeModal, children, handleCloseButton, noFooter = false }) => {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        }
        document.body.style.overflowY = "hidden";
        document.addEventListener('keydown', listener)

        return () => {
            document.body.style.overflowY = "scroll";
            document.removeEventListener('keydown', listener)
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.Wrapper}>
            <div className={styles.Backdrop} onClick={closeModal}></div>
            <div className={styles.CloseButton} onClick={closeModal}>
                <CloseButton />
            </div>
            <div className={styles.Modal}>
                {children}
                {!noFooter && handleCloseButton}
            </div>
        </div>,
        document.querySelector("#modal-portal")!
    );
};
export default Modal;