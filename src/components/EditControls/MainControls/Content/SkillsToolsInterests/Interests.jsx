import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Interests({ ariaExpanded, handleIsInterestsFormOpen }) {
    const { setCVData, skillsOrder, setSkillsOrder } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const interests = skillsToolsInterests.interests;

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
            const interests = draft.skillsToolsInterests.interests;
            if (interests === undefined) throw new Error('Interests not found!');

            interests.isVisible = !interests.isVisible;
       })
    }

    return (
        <div 
            role='button' 
            aria-expanded={ariaExpanded}
            aria-controls='interests-form'
            className={styles.interestsContainer} 
            onClick={() => handleIsInterestsFormOpen(true)}
        >
            <span className={styles.interestsHeadline}>Interests</span>

            <button 
                aria-label={interests.isVisible ? 'Hide interests' : 'Show interests'}
                className={styles.interestsVisibilityBtn} 
                onClick={(handleVisibility)}
            >
                <span className={`${styles.interestsVisibilityBtnIcon} material-symbols-outlined`}>
                    {interests.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}