import { useNavigate } from "react-router-dom"
import { Navigation } from "../component/Navigation"
import styles from './Header.module.css'
import { ReactComponent as Logo } from '../assets/Leaf.svg';

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.Header}>
            <div className={styles.Logo} onClick={() => navigate('/')}>
                <Logo />
                <div className={styles.Brand}>
                    <div><span>Organik</span></div>
                </div>
            </div>
            <Navigation />
            {/* Gardenizer */}
            {/* Legumz */}
        </div>
    )
}
export default Header;