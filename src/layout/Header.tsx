import { useNavigate } from "react-router-dom"
import { Navigation } from "../component/Navigation"
import styles from './Header.module.css'
import { ReactComponent as Logo } from '../assets/Leaf.svg';
import NavigationMobile from "../component/NavigationMobile";

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.Header}>
            <div className={styles.Logo} onClick={() => navigate('/')}>
                <Logo />
                <div className={styles.Brand}>
                    <div><span>Organik</span></div>
                    {/* <div><span>Keenagro</span></div> */}
                </div>
            </div>
            <NavigationMobile />
            <Navigation />
            {/* Gardenizer */}
            {/* Legumz */}
            {/* KeenAggro => organic */}
        </div>
    )
}
export default Header;