import { View, Text, Svg, Rect, StyleSheet } from '@react-pdf/renderer';

import SubPoint from './PDFSubPoint.jsx';

const Square = () => (
    <Svg viewBox='0 0 10 10'>
        <Rect 
            x='1'
            y='1'
            width='8'
            height='8'
            fill='black'
        />
    </Svg>
)

export default function Point({ point, bulletPoints }) {
    return (
        <View>
            <Square />
            <Text style={{ fontSize: 13.5, marginBottom: 5.2 }}>{point.point}</Text>

            <View>
                {point.subPoints.length > 0 && (
                    point.subPoints
                        .filter(subPoint => subPoint.isVisible)
                        .map(subPoint => ( 
                            <SubPoint key={subPoint.id} subPoint={subPoint} />
                        ))
                )} 
            </View>
        </View>
    )
}