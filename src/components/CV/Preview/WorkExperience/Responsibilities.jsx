import Point from './Point.jsx';

import styles from './WorkExperience.module.css';

// Displays filtered visible responsibility points as bullet points
export default function Responsibilities({responsibilities, bulletPoints}) {
    return (
        <ul className={styles.responsibilities}>
            {responsibilities.length > 0 && 
                responsibilities
                    .filter(point => point.isVisible)
                    .map(point => (
                        <Point key={point.id} point={point} bulletPoints={bulletPoints} />
                    ))    
            }
        </ul>
    )
}