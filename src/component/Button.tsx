import { FC, PropsWithChildren, MouseEventHandler } from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
    "primary"
    | "secondary"
    | "danger"
    | "success"

type IButton = PropsWithChildren<{
    label?: string,
    type?: ButtonVariant,
    className?: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}>

const Button: FC<IButton> = ({ label, type = 'primary', children, className, onClick }) => {
    return (
        <button aria-label={label} className={`${styles.Button} Button${type?.charAt(0).toUpperCase()}${type?.slice(1)} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button