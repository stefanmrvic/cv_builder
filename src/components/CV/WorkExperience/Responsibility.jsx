import styles from './WorkExperience.module.css';

// This function takes responsibilities prob object which contains primary responsibilities and sub-responsibilities that are listed as indented responsibilities under primary responsibilities 
// in the CV
export default function Responsibility({responsibilities}) {
    return (
        <ul className={styles.responsibilities}>
            {responsibilities.length > 0 && responsibilities.map((responsibility, index) => (
                <li key={index}>
                    <p>{responsibility.point}</p>
                    {responsibility.subPoints && (
                        <ul className={styles.subPoints}>
                            {responsibility.subPoints.map((subPoint, index) => (
                                <li key={index}>{subPoint}</li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}