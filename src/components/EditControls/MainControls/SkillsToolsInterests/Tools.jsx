import styles from './SkillsToolsInterests.module.css';

export default function Tools({data, setCVData, setIsToolsFormOpen}) {
    return (
        <div className={styles.toolsContainer} role='button' onClick={() => setIsToolsFormOpen(true)}>
            <span className={styles.toolsHeadline}>Tools</span>

            <button className={styles.toolsVisibilityBtn} >
                <span className={`${styles.toolsVisibilityBtnIcon} material-symbols-outlined`}>
                    {data.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}