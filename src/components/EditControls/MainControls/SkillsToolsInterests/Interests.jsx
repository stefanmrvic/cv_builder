import styles from './SkillsToolsInterests.module.css';

export default function Interests({data, setCVData, setIsInterestsFormOpen}) {
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
                    {data.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}