
import { useLocation, useNavigate } from "react-router-dom";
import { NamedRoute } from "../routes/routes";
import styles from './NavigationItem.module.css';


interface INavigationItem {
    route: NamedRoute,
}

export const NavigationItem = ({ route }: INavigationItem) => {
    const { name, path } = route;

    const location = useLocation();
    const navigate = useNavigate();

    const active = location.pathname === path;

    return (
        <div
            className={`${styles.NavigationItem} ${active && styles.active}`}
            onClick={() => navigate(path)}
        >
            {name}
        </div>)
}