import styles from './MainControls.module.css';

export default function ExperienceItem({onClick, experience}) {
    return (
        <button onClick={onClick} className={styles.btn}>
            <span className={styles.btnText}>{experience}</span>
            <div className={styles.showTextBtnContainer}>
                <span className={`${styles.showTextBtnIcon} material-icons`}>delete</span>
                <span className={`${styles.showTextBtnIcon} material-symbols-outlined`}>visibility</span>
            </div>
        </button>
    )
}