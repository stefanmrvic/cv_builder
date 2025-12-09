import { View, Text, Svg, Rect, StyleSheet } from '@react-pdf/renderer';

import SubPoint from './PDFSubPoint.jsx';

const Square = ({ style }) => (
    <Svg viewBox='0 0 10 10' width='6.5' height='6.5' style={style}>
        <Rect 
            x='1'
            y='1'
            width='6.5'
            height='6.5'
            fill='black'
        />
    </Svg>
)

export default function Point({ point, bulletPoints }) {
    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 6, marginLeft: 1 }}>
                <Square style={{ marginTop: 5}} />
                {/* <Square style={{  }} /> */}
                <Text style={{ fontSize: 13.5, marginBottom: 5.2, maxWidth: 510 }}>{point.point}</Text>
            </View>

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