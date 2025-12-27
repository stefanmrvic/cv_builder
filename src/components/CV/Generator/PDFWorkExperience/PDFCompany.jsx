import { View } from '@react-pdf/renderer';

import { sortPositionsByEmploymentDate } from '../../../../utils/sortFunctions.js';

import Position from './PDFPosition.jsx';

export default function Company({ company }) {
    const visiblePositions = company.positions.filter(company => company.isVisible);
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
                />
            ))}
        </View>
    )
}