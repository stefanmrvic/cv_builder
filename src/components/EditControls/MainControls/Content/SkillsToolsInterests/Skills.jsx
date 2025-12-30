import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Skills({ handleIsSkillsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const skills = skillsToolsInterests.skills;

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const skills = draft.skillsToolsInterests.skills;
            if (skills === undefined) throw new Error('Skills not found!');

            skills.isVisible = !skills.isVisible;
       })
    }

    return (
        <div className={styles.skillsContainer} role='button' onClick={() => handleIsSkillsFormOpen(true)}>
            <span className={styles.skillsHeadline}>Skills</span>

            <button className={styles.skillsVisibilityBtn} onClick={(handleVisibility)}>
                <span className={`${styles.skillsVisibilityBtnIcon} material-symbols-outlined`}>
                    {skills.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}