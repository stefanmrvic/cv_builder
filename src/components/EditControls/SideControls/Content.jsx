import styles from './SideControls.module.css'

export default function Content() {
    return (
        <button className={styles.contentBtn}>
            <span className="material-symbols-outlined">description</span>
            <span>Content</span>
        </button>
    )
}