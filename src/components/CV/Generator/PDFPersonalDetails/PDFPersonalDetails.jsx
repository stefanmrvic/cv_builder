import {Text, View, Font, StyleSheet, Link } from '@react-pdf/renderer';

Font.register({
    family: 'DejaVu',
    src: 'https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans.ttf'
});

export default function PersonalDetails({ data, wrap }) {
    // Filters out the empty fields in the Personal Details sections to avoid leaving them in the CV.
    // It also leaves out the fullName property for easier styling.
    const nonEmptyFields = Object.entries(data).filter(([key, value]) => (key !== 'fullName' && value !== ''));
 
    // Container StyleSheet
    const styles = StyleSheet.create({
        fullName: { fontSize: 30, fontWeight: 'bold', marginBottom: 5.25 },
        info: { display: 'flex', flexDirection: 'row', rowGap: 5, columnGap: 4.5, flexWrap: 'wrap', paddingBottom: 3 }
    })

    return (
        // Personal Details Container
        <View style={{ borderBottom: '1.25pt solid black', marginBottom: 15}} wrap={wrap}>
            {data.fullName !== '' && (
                // Full Name Text
                <Text style={styles.fullName}>{data.fullName}</Text>
            )} 
            
            {/* Info Details Container */}
            <View style={styles.info}>
                {nonEmptyFields.map(item => {
                    // If it's LinkedIn prop of personalInfo object, return <Link> element, instead of <Text>.
                    if (item[0] === 'linkedin') {
                        return <View> 
                            <Link src={item[1]} style={{ fontSize: 15.75, textDecoration: 'none' }}>LI</Link>
                        </View>
                    }
                    // Return info detail container that includes text + icon separator
                    return <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}> 
                        <Text style={{ fontSize: 15.75, paddingRight: 4.5 }}>{item[1]}</Text>
                        <Text style={{ fontFamily: 'DejaVu', fontSize: 16 }}>❖</Text> 
                    </View>
                })}
            </View>
        </View>
    )
}