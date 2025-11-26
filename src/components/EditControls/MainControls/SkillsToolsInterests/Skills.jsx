import styles from './SkillsToolsInterests.module.css';

export default function Skills({data, setCVData, setIsSkillsFormOpen}) {
    return (
        <div className={styles.skillsContainer} role='button' onClick={() => setIsSkillsFormOpen(true)}>
            <span className={styles.skillsHeadline}>Skills</span>
            
            <button className={styles.visibilityBtn} >
                <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                    {data.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}