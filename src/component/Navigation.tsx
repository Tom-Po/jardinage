import { NavigationItem } from './NavigationItem';
import styles from './Navigation.module.css';
import { routes } from '../routes/routes';

export function Navigation() {
    console.log(routes);

    return (
        <div className={styles.Navigation}>
            {routes.map((route) => (
                <NavigationItem key={route.path} route={route} />
            ))}
        </div>
    )
}