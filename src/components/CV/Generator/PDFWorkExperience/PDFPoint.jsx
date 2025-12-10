import { View, Text } from '@react-pdf/renderer';

import SubPoint from './PDFSubPoint.jsx';
import BulletIcon from '../PDFShapes.jsx';

export default function Point({ point, bulletPoints }) {
    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 6, marginLeft: 1 }}>
                <BulletIcon type={bulletPoints.main} />
                <Text style={{ fontSize: 13.5, marginBottom: 5.2, maxWidth: 510 }}>{point.point}</Text>
            </View>

            <View style={{ marginLeft: 37, marginBottom: 2 }}>
                {point.subPoints.length > 0 && (
                    point.subPoints
                        .filter(subPoint => subPoint.isVisible)
                        .map(subPoint => ( 
                            <SubPoint key={subPoint.id} subPoint={subPoint} bulletPoints={bulletPoints.sub} />
                        ))
                )} 
            </View>
        </View>
    )
}