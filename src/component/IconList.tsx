import Vegetables from '../assets/vegetable';
import styles from './IconList.module.css';

const IconList: React.FC = () => (
    <div className={styles.IconList}>
        {Object.values(Vegetables).map(vege => (
            <img key={vege} className={styles.Icon} src={vege} alt="" />
        ))}
    </div>
)

export default IconList