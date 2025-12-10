import { Document, Page, Font } from '@react-pdf/renderer';

import PersonalDetails from './PDFPersonalDetails/PDFPersonalDetails.jsx';
import WorkExperience from './PDFWorkExperience/PDFWorkExperience.jsx';
import SkillsToolsInterests from './PDFSkillsToolsInterests/PDFSkillsToolsInterests.jsx';
import Education from './PDFEducation/PDFEducation.jsx';

// It removes hyphenation from words across the whole document
Font.registerHyphenationCallback(word => [word]);

export const MyDocument = ({ data, order, bulletPoints }) => {
    return (
        <Document>
            <Page size='A4' style={{ fontFamily: 'Times-Roman', padding: 30 }} wrap>
                <PersonalDetails data={data.personalInfo} />

                {order.map(item => {
                    if (item.id === 'workExperience') {
                        return <WorkExperience key={item.id} data={data.workExperience} bulletPoints={bulletPoints} wrap={true} />
                    } else if (item.id === 'skillsToolsInterests') {
                        return <SkillsToolsInterests key={item.id} data={data.skillsToolsInterests} bulletPoints={bulletPoints.main} wrap={false} />
                    } else {
                        return <Education key={item.id} data={data.education} wrap={false} />
                    }
                })} 
            </Page>
        </Document>
    )
}
