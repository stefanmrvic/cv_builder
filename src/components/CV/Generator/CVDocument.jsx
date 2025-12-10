import { Document, Page, Font } from '@react-pdf/renderer';

import PersonalDetails from './PDFPersonalDetails/PDFPersonalDetails.jsx';
import WorkExperience from './PDFWorkExperience/PDFWorkExperience.jsx';
import SkillsToolsInterests from './PDFSkillsToolsInterests/PDFSkillsToolsInterests.jsx';
import Education from './PDFEducation/PDFEducation.jsx';

// It removes hyphenation from words across the whole document
Font.registerHyphenationCallback(word => [word]);

export const MyDocument = ({ data, bulletPoints }) => {
    return (
        <Document>
            <Page size='A4' style={{ fontFamily: 'Times-Roman', padding: 30 }} wrap>
                <PersonalDetails data={data.personalInfo} />
                <WorkExperience data={data.workExperience} bulletPoints={bulletPoints} wrap={true} />
                <SkillsToolsInterests data={data.skillsToolsInterests} bulletPoints={bulletPoints.main} wrap={false} />
                <Education data={data.education} wrap={false} />
            </Page>
        </Document>
    )
}
