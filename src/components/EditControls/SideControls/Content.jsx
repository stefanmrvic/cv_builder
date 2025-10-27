import styles from './SideControls.module.css'

export default function Content({className, onClick}) {
    return (
        <button className={`${className} ${styles.contentBtn}`} onClick={onClick}>
            <span className="material-symbols-outlined">description</span>
            <span>Content</span>
        </button>
    )
}