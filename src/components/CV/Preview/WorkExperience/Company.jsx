import Position from './Position.jsx'

import { sortPositionsByEmploymentDate } from '../../../../utils/sortFunctions.js';

import styles from './WorkExperience.module.css'

export default function Company({company, bulletPoints}) {
    const visiblePositions = company.positions.filter(company => company.isVisible);
    const sortedPositions = visiblePositions.sort(sortPositionsByEmploymentDate);

    let firstVisiblePosition = visiblePositions[0];

    return (
        <div className={styles.companyContainer}>
            {sortedPositions.map(position => (
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