import { View, Text } from '@react-pdf/renderer';

import SubPoint from './PDFSubPoint.jsx';
import { Square, CirclePoint, Triangle, Diamond } from './PDFShapes.jsx';

export default function Point({ point, bulletPoints }) {
    const BulletIcon = ({ type, style }) => {
        const bulletComponents = {
            square: Square,
            circle: Circle,
            triangle: Triangle,
            diamond: Diamond
        }

        const Component = bulletComponents[type];
        return <Component style={style} />
    }

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 6, marginLeft: 1 }}>
                {/* {bulletPoints.main === 'square' && (
                    <Square style={{ marginTop: 5}} />
                )} */}
                
                <BulletIcon type={bulletPoints.main} style={{ marginTop: 5 }} />
                
                {/* {bulletPoints.main === 'triangle' && (
                    <Triangle style={{ marginTop: 5}} />
                )}

                {bulletPoints.main === 'diamond' && (
                    <Diamond style={{ marginTop: 5}} />
                )} */}

                <Text style={{ fontSize: 13.5, marginBottom: 5.2, maxWidth: 510 }}>{point.point}</Text>
            </View>

            <View style={{ marginLeft: 50 }}>
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