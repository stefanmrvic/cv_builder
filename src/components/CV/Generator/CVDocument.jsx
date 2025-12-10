import { Document, Page, Font } from '@react-pdf/renderer';

import PersonalDetails from './PDFPersonalDetails/PDFPersonalDetails.jsx';
import WorkExperience from './PDFWorkExperience/PDFWorkExperience.jsx';
// import SkillsToolsInterests from './PDFSkillsToolsInterests.jsx';
// import Education from './PDFEducation.jsx';

import cvData from '../../../data/defaultCV.js';

// It removes hyphenation from words across the whole document
Font.registerHyphenationCallback(word => [word]);

export const MyDocument = () => (
    <Document>
        <Page size='A4' style={{ fontFamily: 'Times-Roman', padding: 30 }}>
            <PersonalDetails data={cvData.personalInfo} />
            <WorkExperience data={cvData.workExperience} />
        </Page>
    </Document>
)
