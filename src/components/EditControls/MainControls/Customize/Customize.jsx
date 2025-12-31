import Order from './Order/Order.jsx';
import BulletPoints from './BulletPoints/BulletPoints.jsx';

import styles from './Customize.module.css';

export default function Customize({ style }) {
    return (
        <section id='customize-panel' role='tabpanel' className={styles.customizeContainer} style={style}>
            <Order />
            <BulletPoints />
        </section>
    )
}