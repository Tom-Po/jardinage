import { Link, Outlet, useLocation } from "react-router-dom"
import styles from './SeedScreen.module.css'

const SeedScreen = () => {
    const location = useLocation()
    return (
        <div className={styles.SeedScreen}>
            <nav className={styles.Navigation}>
                <Link className={`${styles.NavigationLink} ${location.pathname === "/seeds" ? styles.active : ''}`} to='/seeds'>Toutes les graines</Link>
                <Link className={`${styles.NavigationLink} ${location.pathname.match("create") ? styles.active : ''}`} to='create'>Ajouter une graine</Link>
            </nav>
            <Outlet />
        </div >
    )
}

export default SeedScreen