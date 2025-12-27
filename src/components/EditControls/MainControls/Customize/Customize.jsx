import Order from './Order/Order.jsx';
import BulletPoints from './BulletPoints/BulletPoints.jsx';

import styles from './Customize.module.css';

export default function Customize() {
    return (
        <div className={styles.customizeContainer}>
            <Order />
            <BulletPoints />
        </div>
    )
}