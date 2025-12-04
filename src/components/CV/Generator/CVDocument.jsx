import { Document, Page, Font, Text, View, StyleSheet } from '@react-pdf/renderer';

import PersonalDetails from './PDFPersonalDetails.jsx';
import WorkExperience from './PDFWorkExperience.jsx';
// import SkillsToolsInterests from './PDFSkillsToolsInterests.jsx';
// import Education from './PDFEducation.jsx';

import cvData from '../../../data/defaultCV.js';

export const MyDocument = () => (
    <Document>
        <Page size='A4' style={{ fontFamily: 'Times-Roman', padding: 30 }}>
            <PersonalDetails data={cvData.personalInfo} />
            <WorkExperience data={cvData.workExperience} />
        </Page>
    </Document>
)
