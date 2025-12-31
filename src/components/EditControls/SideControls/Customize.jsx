import styles from './SideControls.module.css'

export default function Customize({ className, ariaSelected, onClick }) {
    return (
        <button 
            className={`${className} ${styles.btn} ${styles.contentBtn}`} 
            role='tab' 
            aria-controls='customize-panel'
            aria-selected={ariaSelected}
            onClick={onClick}
        >
            <span className="material-symbols-outlined">design_services</span>
            <span>Customize</span>
        </button>
    )
}