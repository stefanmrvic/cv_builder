import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Tools({ ariaExpanded, handleIsToolsFormOpen }) {
    const { setCVData, skillsOrder, setSkillsOrder } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const tools = skillsToolsInterests.tools;

    const handleOrderShiftUp = () => {
        if (index === 0) return;

        const newArr = skillsOrder.map((item, itemIndex) => {
            if (itemIndex === index - 1) return skillsOrder[index];
            else if (itemIndex === index) return skillsOrder[index - 1];

            return item;
        })

        setSkillsOrder(newArr);
    }

    const handleOrderShiftDown = () => {
        if (index === skillsOrder.length - 1) return;

        const newArr = skillsOrder.map((item, itemIndex) => {
            if (itemIndex === index + 1) return skillsOrder[index];
            else if (itemIndex === index) return skillsOrder[index + 1];

            return item;
        })

        setSkillsOrder(newArr);
    }

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