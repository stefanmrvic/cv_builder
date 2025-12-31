import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Skills({ ariaExpanded, handleIsSkillsFormOpen }) {
    const { setCVData, skillsOrder, setSkillsOrder } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const skills = skillsToolsInterests.skills;

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
            const skills = draft.skillsToolsInterests.skills;
            if (skills === undefined) throw new Error('Skills not found!');

            skills.isVisible = !skills.isVisible;
       })
    }

    return (
        <div 
            role='button' 
            aria-expanded={ariaExpanded}
            aria-controls='skills-form'
            className={styles.skillsContainer} 
            onClick={() => handleIsSkillsFormOpen(true)}
        >
            <span className={styles.skillsHeadline}>Skills</span>

            <button 
                aria-label={skills.isVisible ? 'Hide skills' : 'Show skills'}
                className={styles.skillsVisibilityBtn} 
                onClick={(handleVisibility)}
            >
                <span className={`${styles.skillsVisibilityBtnIcon} material-symbols-outlined`}>
                    {skills.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}