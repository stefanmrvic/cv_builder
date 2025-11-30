import Order from './Order/Order.jsx';
import BulletPoints from './BulletPoints/BulletPoints.jsx';
import Fonts from './Fonts/Fonts.jsx';

import styles from './Customize.module.css';

export default function Customize({data, setCVData, order, setOrder, setBulletPoints, setFont}) {
    return (
        <div className={styles.customizeContainer}>
            <Order order={order} setOrder={setOrder} />
            <BulletPoints setBulletPoints={setBulletPoints} />
            <Fonts setFont={setFont} />
        </div>
    )
}