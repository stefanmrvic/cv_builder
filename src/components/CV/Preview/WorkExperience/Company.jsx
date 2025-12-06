import Position from './Position.jsx'

import styles from './WorkExperience.module.css'

export default function Company({company, bulletPoints}) {
    const visiblePositions = company.positions.filter(company => company.isVisible);
    let firstVisiblePosition = visiblePositions[0];

    return (
        <div className={styles.companyContainer}>
            {visiblePositions.map(position => (
                <Position 
                    key={position.id}
                    isFirst={position === firstVisiblePosition} 
                    companyName={company.companyName}
                    location={company.location}
                    position={position} 
                    bulletPoints={bulletPoints}
                />
            ))}
        </div>
    )
}