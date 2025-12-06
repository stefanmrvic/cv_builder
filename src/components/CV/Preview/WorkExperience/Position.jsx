import Responsibilities from './Responsibilities.jsx'

import styles from './WorkExperience.module.css';

// Passes companyName and location so that last position in that company can display company details above the job title,
// since Position objects don't have access to their parent company's properties.
export default function Position({isLast, companyName, location, position, bulletPoints}) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (date === NaN) throw new Error('Invalid date!');

        const dateArr = date.toDateString().split(' ');
        const year = dateArr[3];
        const month = dateArr[1];

        return `${month}. ${year}`;
    }

    const formattedStartDate = formatDate(position.startDate);
    const formattedEndDate = formatDate(position.endDate);

    return (
        <div className={styles.positionContainer}>
            <div className={styles.positionHeader}>
                {isLast ? (
                    <>
                        <div className={styles.flexContainer}>
                            <p className={styles.companyName}>{companyName}</p>
                            <p className={styles.startEndDate}>{formattedStartDate} - {position.currentlyEmployed ? 'Present' : formattedEndDate}</p>
                        </div>
                        <div className={styles.flexContainer}>
                            <p className={styles.jobTitle}>{position.title}</p>
                            <p className={styles.workLocation}>{location}</p>
                        </div>
                    </>
                ) : (
                    <div className={styles.flexContainer}>
                        <p className={styles.jobTitle}>{position.title}</p>
                        <p className={styles.startEndDate}>{formattedStartDate} - {position.currentlyEmployed ? 'Present' : formattedEndDate}</p>
                    </div>
                    )
                }
            </div>
            
            <Responsibilities responsibilities={position.responsibilities} bulletPoints={bulletPoints}/>
        </div>
    )
}