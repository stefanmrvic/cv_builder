import Responsibility from './Responsibility.jsx'

import styles from './WorkExperience.module.css';

export default function Position({isFirst, companyName, location, position}) {
    return (
        <>
        {position.isVisible && (
            <div className={styles.positionContainer}>
                <div className={styles.positionHeader}>
                    {isFirst ? (
                        <>
                            <div className={styles.flexContainer}>
                                <p className={styles.companyName}>{companyName}</p>
                                <p className={styles.startEndDate}>{position.startDate} - {position.endDate}</p>
                            </div>
                            <div className={styles.flexContainer}>
                                <p className={styles.jobTitle}>{position.title}</p>
                                <p className={styles.workLocation}>{location}</p>
                            </div>
                        </>
                    ) : (
                            <div className={styles.flexContainer}>
                                <p className={styles.jobTitle}>{position.title}</p>
                                <p className={styles.startEndDate}>{position.startDate} - {position.endDate}</p>
                            </div>
                        )
                    }
                </div>
                <Responsibility responsibilities={position.responsibilities} />
            </div>
        )}
        </>
    )
}