import { Document, Page, Font } from '@react-pdf/renderer';

import PersonalDetails from './PDFPersonalDetails/PDFPersonalDetails.jsx';
import WorkExperience from './PDFWorkExperience/PDFWorkExperience.jsx';
import SkillsToolsInterests from './PDFSkillsToolsInterests/PDFSkillsToolsInterests.jsx';
import Education from './PDFEducation/PDFEducation.jsx';

// It removes hyphenation from words across the whole PDF document
Font.registerHyphenationCallback(word => [word]);

export const MyDocument = ({ data, order, bulletPoints }) => {
    return (
        <Document>
            <Page size='A4' style={{ fontFamily: 'Times-Roman', padding: 30 }} wrap>
                <PersonalDetails personalInfo={data.personalInfo} />

                {order.map(item => {
                    if (item.id === 'workExperience') {
                        return <WorkExperience key={item.id} workExperience={data.workExperience} bulletPoints={bulletPoints} wrap={true} />
                    } else if (item.id === 'skillsToolsInterests') {
                        return <SkillsToolsInterests key={item.id} skillsToolsInterests={data.skillsToolsInterests} bulletPoints={bulletPoints.main} wrap={false} />
                    } else {
                        return <Education key={item.id} education={data.education} wrap={false} />
                    }
                })} 
            </Page>
        </Document>
    )
}
