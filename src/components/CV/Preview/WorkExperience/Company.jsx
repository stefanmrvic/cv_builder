import Position from './Position.jsx'

import { sortPositionsByEmploymentDate } from '../../../../utils/sortFunctions.js';

import styles from './WorkExperience.module.css'

export default function Company({ company }) {
    // Returns null if there are no positions under the company object
    if (company.positions.length === 0) return null;

    const visiblePositions = company.positions.filter(company => company.isVisible);
    // Returns null if there are no visible positions in company object
    if (visiblePositions.length === 0) return null;

    const sortedPositions = visiblePositions.sort(sortPositionsByEmploymentDate);

    let firstVisiblePosition = visiblePositions[0];

    return (
        <div className={styles.companyContainer}>
            {sortedPositions.map(position => (
                <Position 
                    key={position.id}
                    position={position} 
                    isFirst={position === firstVisiblePosition} 
                    companyName={company.companyName}
                    location={company.location}
                />
            ))}
        </div>
    )
}