import Responsibilities from './Responsibilities.jsx'

import styles from './WorkExperience.module.css';

// Passes companyName and location so the first position can display company details above the job title,
// since Position objects don't have access to their parent company's properties.
export default function Position({isFirst, companyName, location, position, bulletPoints}) {
    return (
        <>
        {position.isVisible && (
            <div className={styles.positionContainer}>
                <div className={styles.positionHeader}>
                    {isFirst ? (
                        <>
                            <div className={styles.flexContainer}>
                                <p className={styles.companyName}>{companyName}</p>
                                <p className={styles.startEndDate}>{position.startDate} - {position.currentlyEmployed ? 'Present' : position.endDate}</p>
                            </div>
                            <div className={styles.flexContainer}>
                                <p className={styles.jobTitle}>{position.title}</p>
                                <p className={styles.workLocation}>{location}</p>
                            </div>
                        </>
                    ) : (
                            <div className={styles.flexContainer}>
                                <p className={styles.jobTitle}>{position.title}</p>
                                <p className={styles.startEndDate}>{position.startDate} - {position.currentlyEmployed ? 'Present' : position.endDate}</p>
                            </div>
                        )
                    }
                </div>
                <Responsibilities responsibilities={position.responsibilities} bulletPoints={bulletPoints}/>
            </div>
        )}
        </>
    )
}