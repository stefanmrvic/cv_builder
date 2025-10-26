import ExperienceItem from './ExperienceItem.jsx';

import styles from './MainControls.module.css';

export default function Experience() {
    return (
        <div className={styles.experienceContainer}>
            <button className={styles.toggleBtn}>
                <span className={`${styles.btnIcon} material-icons`}>business_center</span>
                <span className={styles.experienceHeadline}>Experience</span>
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>

            <div className={styles.btnContainer}>
                <ExperienceItem experience='Netflix' />
                <ExperienceItem experience='Black Mesa Labs' />

                <div className={styles.addBtnContainer}>
                    <button className={`${styles.addBtn} ${styles.btn}`}>
                        <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Experience</span>
                    </button>
                </div>
            </div>
        </div>
    )
}