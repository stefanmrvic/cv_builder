import { useAppContext, useSkills } from '../../../../../AppContext';

import styles from './SkillsToolsInterests.module.css';

export default function Certifications({ ariaExpanded, handleIsCertificationsFormOpen }) {
    const { setCVData } = useAppContext();

    const skillsToolsInterests = useSkills({ ariaExpanded });
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
        <div 
            role='button' 
            aria-expanded={ariaExpanded}
            aria-controls='certifications-form'
            className={styles.certificationsContainer} 
            onClick={() => handleIsCertificationsFormOpen(true)}
        >
            <span className={styles.certificationsHeadline}>Certifications</span>

            <button 
                aria-label={certifications.isVisible ? 'Hide certifications' : 'Show certifications'}
                className={styles.certificationsVisibilityBtn} 
                onClick={(handleVisibility)}
            >
                <span className={`${styles.certificationsVisibilityBtnIcon} material-symbols-outlined`}>
                    {certifications.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}