import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Interests({ setIsInterestsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const interests = skillsToolsInterests.interests;

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const interests = draft.skillsToolsInterests.interests;
            if (interests === undefined) throw new Error('Interests not found!');

            interests.isVisible = !interests.isVisible;
       })
    }

    return (
        <div className={styles.interestsContainer} role='button' onClick={() => setIsInterestsFormOpen(true)}>
            <span className={styles.interestsHeadline}>Interests</span>

            <button className={styles.interestsVisibilityBtn} onClick={(handleVisibility)}>
                <span className={`${styles.interestsVisibilityBtnIcon} material-symbols-outlined`}>
                    {interests.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}