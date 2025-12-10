import { View, Text } from '@react-pdf/renderer';

import BulletIcon from './PDFShapes.jsx';

export default function SubPoint({ subPoint, bulletPoints }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', columnGap: 6, marginLeft: 1, marginBottom: 3 }}>
            <BulletIcon type={bulletPoints} fill='white' stroke='black' />
            <Text style={{ fontSize: 13.5, marginBottom: 1, maxWidth: 483 }}>{subPoint.subPoint}</Text>
        </View>
    )
}