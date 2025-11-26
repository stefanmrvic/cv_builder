import styles from './SkillsToolsInterests.module.css';

export default function Interests({data, setCVData, setIsInterestsFormOpen}) {
    return (
        <div className={styles.interestsContainer} role='button' onClick={() => setIsInterestsFormOpen(true)}>
            <span className={styles.interestsHeadline}>Interests</span>

            <button className={styles.interestsVisibilityBtn} >
                <span className={`${styles.interestsVisibilityBtnIcon} material-symbols-outlined`}>
                    {data.isVisible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    )
}