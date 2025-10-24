import styles from './SideControls.module.css'

export default function Customize() {
    return (
        <button className={styles.customizeBtn}>
            <span class="material-symbols-outlined">design_services</span>
            <span>Customize</span>
        </button>
    )
}