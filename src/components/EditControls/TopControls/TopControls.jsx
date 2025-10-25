import styles from './TopControls.module.css'

export default function TopControls() {
    return (
        <div className={styles.topControls}>
            <nav className={styles.topNavbar}>
                <button className={styles.clearResume}>
                    <span className="material-symbols-outlined">delete</span>
                    <span>Clear Resume</span>
                </button>
                <button className={styles.loadExample}> 
                    <span>Load Example</span>
                </button>
            </nav>
        </div>
    )
}