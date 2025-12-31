import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Tools({ ariaExpanded, handleIsToolsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const tools = skillsToolsInterests.tools;

    const handleVisibility = (e) => {
        e.stopPropagation();

        setCVData(draft => {
            const tools = draft.skillsToolsInterests.tools;
            if (tools === undefined) throw new Error('Tools not found!');

            tools.isVisible = !tools.isVisible;
        })
    }

    return (
        <div 
            role='button' 
            aria-expanded={ariaExpanded}
            aria-controls='tools-form'
            className={styles.toolsContainer} 
            onClick={() => handleIsToolsFormOpen(true)}
        >
            <span className={styles.toolsHeadline}>Tools</span>

            <button 
                aria-label={tools.isVisible ? 'Hide tools' : 'Show tools'}
                className={styles.toolsVisibilityBtn} 
                onClick={(handleVisibility)}
            >
                <span className={`${styles.toolsVisibilityBtnIcon} material-symbols-outlined`}>
                    {tools.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}