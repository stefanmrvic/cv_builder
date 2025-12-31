import { View, Text, StyleSheet } from '@react-pdf/renderer';

import BulletIcon from '../PDFShapes.jsx';

export default function SkillsToolsInterests({ skillsToolsInterests, skillsOrder, bulletPoints, wrap }) {
    const { certifications, skills, tools, interests } = skillsToolsInterests;

    // Exits if there are no items under skillsToolsInterests object
    if (certifications.items.length === 0 && skills.items.length === 0 && tools.items.length === 0 && interests.items.length === 0) return null;

    // Container StyleSheets
    const styles = StyleSheet.create({
        headline: { fontSize: 13.5, fontWeight: 'bold', paddingBottom: 2.25, marginBottom: 4.5, borderBottom: '1.25pt solid black' }
    })

    const certificationsStr = certifications.items.map(item => item.name).join('; ');
    const skillsStr = skills.items.map(item => item.name).join('; ');
    const toolsStr = tools.items.map(item => item.name).join('; ');
    const interestsStr = interests.items.map(item => item.name).join('; ');

    return (
        <View style={{ marginBottom: 15 }} wrap={wrap}>
            {certifications.items.length > 0  ? (
                <Text style={styles.headline}>CERTIFICATIONS & SKILLS</Text>
            ) : (
                <Text style={styles.headline}>SKILLS, TOOLS & INTERESTS</Text>
            )}

            {skillsOrder.map(item => {
                if (item.id === 'certifications') {
                    {/* Certifications */}
                    return <View key={item.id}>
                        {(certifications.isVisible && certifications.items.length > 0) && (
                            <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 520 }}>
                                <BulletIcon type={bulletPoints} size='6.7' />
                                <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .2, lineHeight: 1.25 }}>Certifications:
                                    <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {certificationsStr}</Text>
                                </Text>
                            </View>
                        )}
                    </View>
                } else if (item.id === 'skills') {
                    {/* Skills */}
                    return <View key={item.id}>
                        {(skills.isVisible && skills.items.length > 0) && (
                            <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 520 }}>
                                <BulletIcon type={bulletPoints} size='6.7' />
                                <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .2, lineHeight: 1.25 }}>Skills:
                                    <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {skillsStr}</Text>
                                </Text>
                            </View>
                        )}
                    </View>
                } else if (item.id === 'tools') {
                    {/* Tools */}
                    return <View key={item.id}>
                        {(tools.isVisible && tools.items.length > 0) && (
                            <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 500 }}>
                                <BulletIcon type={bulletPoints} size='6.7' />
                                <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .2, lineHeight: 1.25 }}>Tools:
                                    <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {toolsStr}</Text>
                                </Text>
                            </View>
                        )}
                    </View>
                } else {
                    {/* Interests */}
                    return <View key={item.id}>
                        {(interests.isVisible && interests.items.length > 0) && (
                            <View style={{ display: 'flex', flexDirection: 'row', maxWidth: 500 }}>
                                <BulletIcon type={bulletPoints} size='6.7' />
                                <Text style={{ fontSize: 13.5, fontWeight: 'bold', marginLeft: 7, marginBottom: .2, lineHeight: 1.25 }}>Interests:
                                    <Text style={{ fontSize: 13.5, fontWeight: 'normal' }}> {interestsStr}</Text>
                                </Text>
                            </View>
                        )}
                    </View>
                }
            })}
        </View>
    )
}