import Order from './Order/Order.jsx';
import BulletPoints from './BulletPoints/BulletPoints.jsx';
import Fonts from './Fonts/Fonts.jsx';

import styles from './Customize.module.css';

export default function Customize({data, setCVData, setOrder, setBulletPoints, setFont}) {
    return (
        <div className={styles.customizeContainer}>
            <Order setOrder={setOrder} />
            <BulletPoints setBulletPoints={setBulletPoints} />
            <Fonts setFont={setFont} />
        </div>
    )
}