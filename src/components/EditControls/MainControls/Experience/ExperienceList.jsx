import Company from './Company.jsx';

import styles from '../MainControls.module.css';

export default function ExperienceList({className, onClick, ref}) {
    return (
        <div className={`${className} ${styles.btnContainer}`} ref={ref}>
                <Company 
                    onClick={onClick}
                    company='Netflix' />
                <Company 
                    onClick={onClick}
                    company='Black Mesa Labs' />

                <div className={styles.addBtnContainer}>
                    <button className={`${styles.addBtn} ${styles.btn}`} onClick={onClick}>
                        <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Experience</span>
                    </button>
                </div>
        </div>
    )
}