import EducationItem from './EducationItem.jsx';

import styles from './MainControls.module.css';

export default function EducationList({className, onClick, ref}) {
    return (
        <div className={`${className} ${styles.btnContainer}`} ref={ref}>
                <EducationItem 
                    onClick={onClick}
                    education='University of Barkeley' />
                <EducationItem 
                    onClick={onClick}
                    education='Masters University' />

                <div className={styles.addBtnContainer}>
                    <button className={`${styles.addBtn} ${styles.btn}`}>
                        <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Education</span>
                    </button>
                </div>
        </div>
    )
}