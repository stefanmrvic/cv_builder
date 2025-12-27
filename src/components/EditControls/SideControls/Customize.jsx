import styles from './SideControls.module.css'

export default function Customize({ className, onClick }) {
    return (
        <button className={`${className} ${styles.btn} ${styles.contentBtn}`} onClick={onClick}>
            <span className="material-symbols-outlined">design_services</span>
            <span>Customize</span>
        </button>
    )
}