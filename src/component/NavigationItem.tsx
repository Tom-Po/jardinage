
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NamedRoute } from "../routes/routes";
import styles from './NavigationItem.module.css';


interface INavigationItem {
    route: NamedRoute,
}

export const NavigationItem = ({ route }: INavigationItem) => {
    const { name, path } = route;

    const location = useLocation();
    const active = location.pathname.match(path);

    return (
        <Link
            className={`${styles.NavigationItem} ${active && styles.active}`}
            to={path}
        >
            {name}
        </Link>
    )
}