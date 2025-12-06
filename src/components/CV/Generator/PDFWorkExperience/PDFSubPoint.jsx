import { View, Text, StyleSheet } from '@react-pdf/renderer';

export default function SubPoint({ subPoint }) {
    return (
        <View style={{ marginBottom: 3 }}>
            <Text style={{ fontSize: 13.5 }}>{subPoint.subPoint}</Text>
        </View>
    )
}