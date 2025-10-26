import styles from './MainControls.module.css';

export default function EducationItem({university}) {
    return (
        <button className={styles.btn}>
            <span className={styles.btnText}>{university}</span>
            <div className={styles.showTextBtnContainer}>
                <span className={`${styles.showTextBtnIcon} material-icons`}>delete</span>
                <span className={`${styles.showTextBtnIcon} material-symbols-outlined`}>visibility</span>
            </div>
        </button>
    )
}