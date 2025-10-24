import styles from './WorkExperience.module.css';

// This function takes responsibilities prob object which contains primary responsibilities and sub-responsibilities that are listed as indented responsibilities under primary responsibilities 
// in the CV
export default function Responsibility({responsibilities}) {
    return (
        <ul>
            {responsibilities?.map((responsibility, index) => {
                {/* Checks if the current responsibility contains any sub-responsibilities */}
                if (responsibility.sub) {
                    return <li key={index}>
                        {responsibility.primary}
                        <ul className={styles.subResponsibility}> 
                            {responsibility.sub?.map((subResponsibility, index) => {
                                return <li key={index}>
                                    {subResponsibility}
                                </li>
                            })}
                        </ul>
                    </li>
                }
                {/* If the current responsibility doesn't contain any sub-responsibilities, it creates <li> elements just for the primary responsibilities */}
                return <li key={index}>
                    {responsibility.primary}
                </li>
            })}
        </ul>
    )
}