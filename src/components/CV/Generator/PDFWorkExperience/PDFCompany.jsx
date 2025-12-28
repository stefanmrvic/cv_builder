import { View } from '@react-pdf/renderer';

import { sortPositionsByEmploymentDate } from '../../../../utils/sortFunctions.js';

import Position from './PDFPosition.jsx';

export default function Company({ company, bulletPoints }) {
    // Returns null if there are no positions under the company object
    if (company.positions.length === 0) return null;
    
    const visiblePositions = company.positions.filter(company => company.isVisible);
    // Returns null if there are no visible positions in company object
    if (visiblePositions.length === 0) return null;
    
    const sortedPositions = visiblePositions.sort(sortPositionsByEmploymentDate);

    let firstVisiblePosition = visiblePositions[0];

    return (
        <View>
            {sortedPositions.map(position => (
                <Position 
                    key={position.id}
                    isFirst={position === firstVisiblePosition} 
                    companyName={company.companyName}
                    location={company.location}
                    position={position} 
                    bulletPoints={bulletPoints}
                />
            ))}
        </View>
    )
}