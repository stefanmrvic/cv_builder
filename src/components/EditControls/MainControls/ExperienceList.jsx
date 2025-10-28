import ExperienceItem from './ExperienceItem.jsx';

import styles from './MainControls.module.css';

export default function ExperienceList({className, onClick, ref}) {
    return (
        <div className={`${className} ${styles.btnContainer}`} ref={ref}>
                <ExperienceItem 
                    onClick={onClick}
                    experience='Netflix' />
                <ExperienceItem 
                    onClick={onClick}
                    experience='Black Mesa Labs' />

                <div className={styles.addBtnContainer}>
                    <button className={`${styles.addBtn} ${styles.btn}`}>
                        <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Experience</span>
                    </button>
                </div>
        </div>
    )
}