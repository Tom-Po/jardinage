import { Link, Outlet } from "react-router-dom"
import styles from './SeedScreen.module.css'

const SeedScreen = () => (
    <div className={styles.SeedScreen}>
        <nav className={styles.Navigation}>
            <Link className={styles.NavigationLink} to='/seeds'>Liste des graines</Link>
            <Link className={styles.NavigationLink} to='create'>Créer une graine</Link>
        </nav>
        <Outlet />
    </div>
)

export default SeedScreen