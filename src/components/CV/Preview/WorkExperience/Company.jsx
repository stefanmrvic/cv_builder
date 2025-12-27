import Position from './Position.jsx'

import { sortPositionsByEmploymentDate } from '../../../../utils/sortFunctions.js';

import styles from './WorkExperience.module.css'

export default function Company({ company }) {
    const visiblePositions = company.positions.filter(company => company.isVisible);
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