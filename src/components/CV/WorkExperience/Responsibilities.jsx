import Point from './Point.jsx';

import styles from './WorkExperience.module.css';

// Displays filtered visible responsibilities as bullet points
export default function Responsibilities({responsibilities}) {
    return (
        <ul className={styles.responsibilities}>
            {responsibilities.length > 0 && 
                responsibilities
                    .filter(point => point.isVisible)
                    .map(point => (
                        <Point key={point.id} point={point} />
                    ))    
            }
        </ul>
    )
}