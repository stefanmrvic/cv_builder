import { useAppContext } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Certifications({ setIsCertificationsFormOpen }) {
    const { setCVData } = useAppContext();

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const skills = draft.skillsToolsInterests.skills;
            if (skills === undefined) throw new Error('Skills not found!');

            skills.isVisible = !skills.isVisible;
       })
    }

    return (
        <div className={styles.skillsContainer} role='button' onClick={() => setIsCertificationsFormOpen(true)}>
            <span className={styles.skillsHeadline}>Skills</span>

            <button className={styles.skillsVisibilityBtn} onClick={(handleVisibility)}>
                <span className={`${styles.skillsVisibilityBtnIcon} material-symbols-outlined`}>
                    {data.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}