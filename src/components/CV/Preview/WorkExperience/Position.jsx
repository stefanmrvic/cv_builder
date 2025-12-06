import Point from './Point.jsx';

import styles from './WorkExperience.module.css';

// Passes companyName and location so that last position in that company can display company details above the job title,
// since Position objects don't have access to their parent company's properties.
export default function Position({ isFirst, companyName, location, position, bulletPoints }) {
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
                {/* Only the first (most recent) position displays the company name & location. */}
                {isFirst ? (
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
            
            <ul className={styles.responsibilities}>
                {position.responsibilities.length > 0 && (
                    position.responsibilities
                        .filter(point => point.isVisible)
                        .map(point => (
                            <Point key={point.id} point={point} bulletPoints={bulletPoints} />
                        ))    
                )}
            </ul>
        </div>
    )
}