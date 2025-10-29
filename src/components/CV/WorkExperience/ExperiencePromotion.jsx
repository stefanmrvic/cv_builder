import JobTitle from './JobTitle.jsx'
import StartEndDate from './StartEndDate.jsx'
import Responsibility from './Responsibility.jsx'

import styles from './WorkExperience.module.css'

export default function ExperiencePromotion(props) {
    return (
        <div className={styles.experienceContainer}>
            <div className={styles.flexContainer}>
                <JobTitle 
                    className={styles.jobTitle}
                    title={props.title} 
                />
                <StartEndDate 
                    className={styles.startEndDate}
                    date={props.date} 
                />
            </div>
            <Responsibility responsibilities={props.responsibilities} />
        </div>
    )
}