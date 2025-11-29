import styles from './SkillsToolsInterests.module.css';

export default function Tools({data, setCVData, setIsToolsFormOpen}) {
        const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const tools = draft.skillsToolsInterests.tools;
            if (tools === undefined) throw new Error('Tools not found!');

            tools.isVisible = !tools.isVisible;
       })
    }

    return (
        <div className={styles.toolsContainer} role='button' onClick={() => setIsToolsFormOpen(true)}>
            <span className={styles.toolsHeadline}>Tools</span>

            <button className={styles.toolsVisibilityBtn} onClick={(handleVisibility)}>
                <span className={`${styles.toolsVisibilityBtnIcon} material-symbols-outlined`}>
                    {data.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}