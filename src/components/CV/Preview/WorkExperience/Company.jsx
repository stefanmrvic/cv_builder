import Position from './Position.jsx'

import styles from './WorkExperience.module.css'

export default function Company({company, bulletPoints}) {
    if (!company) return null;

    const visiblePositions = company.positions.filter(item => item.isVisible);
    if (!visiblePositions) return null;

    let firstVisiblePosition = visiblePositions[0];

    return (
        <div className={styles.companyContainer}>
            {visiblePositions.map(position => (
                <Position 
                    key={position.id}
                    isLast={position === firstVisiblePosition} 
                    companyName={company.companyName}
                    location={company.location}
                    position={position} 
                    bulletPoints={bulletPoints}
                />
            ))}
        </div>
    )
}