import SideControls from './SideControls/SideControls.jsx';
import TopControls from './TopControls/TopControls.jsx'
import MainControls from './MainControls/MainControls.jsx'

import styles from './EditControls.module.css';

export default function EditControls() {
    return (
        <div className={styles.editControls}>
            <SideControls />
            <TopControls />
            <MainControls />
        </div>
    )
}