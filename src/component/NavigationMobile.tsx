import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../routes/routes'
import styles from './NavigationMobile.module.css'

const NavigationMobile = () => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflowY = "hidden";
        }

        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [open]);

    return (
        <div>
            <div className={styles.MenuBtn} onClick={toggleOpen}>
                <div className={`${styles.Burger} ${open && styles.Open}`}>
                </div>
            </div>
            {open && (
                <div className={styles.MobileNav} onClick={toggleOpen}>
                    {routes.map((route) => (
                        <Link key={route.path} to={route.path}>{route.name}</Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NavigationMobile