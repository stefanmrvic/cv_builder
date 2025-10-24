import Content from './Content.jsx'
import Customize from './Customize.jsx'

import styles from './SideControls.module.css'

export default function SideControls() {
    return (
        <div className={styles.sideControls}>
            <nav className={styles.sidebar}>
                <Content />
                <Customize />
            </nav>
        </div>
    )
}