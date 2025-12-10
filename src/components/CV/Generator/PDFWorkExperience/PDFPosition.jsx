import { View, Text } from '@react-pdf/renderer';

import Point from './PDFPoint.jsx';

export default function Position({ isFirst, companyName, location, position, bulletPoints }) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (date === NaN) throw new Error('Invalid date!');

        const dateArr = date.toDateString().split(' ');
        const year = dateArr[3];
        const month = dateArr[1];

        return `${month}. ${year}`;
    }

    const formattedStartDate = formatDate(position.startDate);
    const formattedEndDate = formatDate(position.endDate);

    return (
        // Position Container
        <View style={{ marginBottom: 15 }}>
            {/* Position Header Container Start */}
            <View>
               {/* Only the first (most recent) position displays the company name & location. */}
                {isFirst ? (
                    // Company startDate & endDate row container
                    <>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                            <Text style={{ fontSize: 14, fontWeight:'bold' }}>{companyName}</Text>
                            <Text style={{ fontSize: 14, fontWeight:'bold' }}>{formattedStartDate} - {position.currentlyEmployed ? 'Present' : formattedEndDate}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                            <Text style={{ fontSize: 14.2, fontStyle: 'italic' }}>{position.title}</Text>
                            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>{location}</Text>
                        </View>
                    </>
                ) : (
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3}}>
                        <Text style={{ fontSize: 14.2, fontStyle: 'italic' }}>{position.title}</Text>
                        <Text style={{ fontSize: 14, fontWeight:'bold' }}>{formattedStartDate} - {position.currentlyEmployed ? 'Present' : formattedEndDate}</Text>
                    </View>
                )}
            </View>
            {/* Position Header Container End */}

            {/* Position Responsibilities */}
            <View>
                {position.responsibilities.length > 0 && (
                    position.responsibilities
                        .filter(point => point.isVisible)
                        .map(point => (
                            <Point key={point.id} point={point} bulletPoints={bulletPoints} />
                        ))    
                )}
            </View>
        </View>
    )
}