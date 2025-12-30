import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Certifications({ handleIsCertificationsFormOpen }) {
    const { setCVData } = useAppContext();

    const skillsToolsInterests = useSkills();
    const certifications = skillsToolsInterests.certifications;

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const certifications = draft.skillsToolsInterests.certifications;
            if (certifications === undefined) throw new Error('Certifications not found!');

            certifications.isVisible = !certifications.isVisible;
       })
    }

    return (
        <div className={styles.certificationsContainer} role='button' onClick={() => handleIsCertificationsFormOpen(true)}>
            <span className={styles.certificationsHeadline}>Certifications</span>

            <button className={styles.certificationsVisibilityBtn} onClick={(handleVisibility)}>
                <span className={`${styles.certificationsVisibilityBtnIcon} material-symbols-outlined`}>
                    {certifications.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}