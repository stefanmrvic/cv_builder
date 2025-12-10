import { View, Text, StyleSheet } from '@react-pdf/renderer';

export default function Education({ data }) {
    // Exits if there are no companies in education object
    if (!data) return null;

    // Container StyleSheets
    const styles = StyleSheet.create({
        headline: { fontSize: 13.5, fontWeight: 'bold', paddingBottom: 2.25, marginBottom: 4.5, borderBottom: '1.25pt solid black' }
    })

    return (
        <View>
            <Text style={styles.headline}>EDUCATION</Text>

            <View>
                
            </View>
        </View>
    )
}