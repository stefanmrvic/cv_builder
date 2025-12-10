import { View, Text, StyleSheet } from '@react-pdf/renderer';

import BulletIcon from '../PDFShapes.jsx';

export default function SkillsToolsInterests({ data, bulletPoints }) {
    // Exits if there are no companies in skillsToolsInterests object
    if (!data) return null;

    // Container StyleSheets
    const styles = StyleSheet.create({
        headline: { fontSize: 13.5, fontWeight: 'bold', paddingBottom: 2.25, marginBottom: 4.5, borderBottom: '1.25pt solid black' }
    })

    const skills = data.skills.items.map(item => item.name).join('; ');
    const tools = data.tools.items.map(item => item.name).join('; ');
    const interests = data.interests.items.map(item => item.name).join('; ');

    return (
        <View>
            <Text style={styles.headline}>SKILLS, TOOLS & INTERESTS</Text>

            {/* Skills */}
            <View>
                {data.skills.items.length > 0 && (
                    <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 500 }}>
                        <BulletIcon type={bulletPoints} size='6.7' />
                        <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .5, lineHeight: 1.25 }}>Skills:
                            <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {skills}</Text>
                        </Text>
                    </View>
                )}
            </View>

            {/* Tools */}
            <View>
                {data.tools.items.length > 0 && (
                    <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 500 }}>
                        <BulletIcon type={bulletPoints} size='6.7' />
                        <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .5, lineHeight: 1.25 }}>Tools:
                            <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {tools}</Text>
                        </Text>
                    </View>
                )}
            </View>

            {/* Interests */}
            <View>
                {data.tools.items.length > 0 && (
                    <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 500 }}>
                        <BulletIcon type={bulletPoints} size='6.7' />
                        <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .5, lineHeight: 1.25 }}>Interests:
                            <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {interests}</Text>
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}