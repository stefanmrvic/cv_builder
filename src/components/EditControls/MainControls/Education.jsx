import EducationItem from './EducationItem.jsx';

import styles from './MainControls.module.css';

export default function Education() {
    return (
        <div className={styles.educationContainer}>
            <button className={styles.toggleBtn}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>school</span>
                <span className={styles.educationHeadline}>Education</span>
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>

            <div className={styles.btnContainer}>
                <EducationItem university='University of Barkeley' />
                <EducationItem university='Masters University' />

                <div className={styles.addBtnContainer}>
                    <button className={`${styles.addBtn} ${styles.btn}`}>
                        <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Education</span>
                    </button>
                </div>
            </div>
        </div>
    )
}