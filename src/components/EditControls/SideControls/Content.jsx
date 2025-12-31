import styles from './SideControls.module.css'

export default function Content({ className, ariaSelected, onClick }) {
    return (
        <button 
            className={`${className} ${styles.btn} ${styles.contentBtn}`} 
            role='tab' 
            aria-controls='content-panel'
            aria-selected={ariaSelected}
            onClick={onClick}
        >
            <span className="material-symbols-outlined">description</span>
            <span>Content</span>
        </button>
    )
}