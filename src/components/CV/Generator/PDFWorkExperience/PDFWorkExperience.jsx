import { View, Text, StyleSheet } from '@react-pdf/renderer';

import { sortCompaniesByEmploymentDate } from '../../../../utils/sortFunctions.js';

import Company from './PDFCompany.jsx';

export default function WorkExperience({ workExperience, bulletPoints, wrap }) {
    // Exits if there are no companies under experience object
    if (workExperience.length === 0) return null;

    const visibleCompanies = workExperience.filter(company => company.isVisible);
    // Returns null if there are no visible companies in workExperience object
    if (visibleCompanies.length === 0) return null;

    const sortedCompanies = visibleCompanies.sort(sortCompaniesByEmploymentDate);

    // Container StyleSheets
    const styles = StyleSheet.create({
        headline: { fontSize: 13.5, fontWeight: 'bold', paddingBottom: 2.25, marginBottom: 4.5, borderBottom: '1.25pt solid black' }
    })

    return (
        <View wrap={wrap}>
            <Text style={styles.headline}>WORK EXPERIENCE</Text>

            <View>
                {sortedCompanies.map(company => (
                    <Company
                        key={company.id}
                        company={company}
                        bulletPoints={bulletPoints}
                    />
                ))}  
            </View>
        </View>
    )
}