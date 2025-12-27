import { useAppContext } from '../../../AppContext.jsx';

import { Document, Page, Font } from '@react-pdf/renderer';

import PersonalDetails from './PDFPersonalDetails/PDFPersonalDetails.jsx';
import WorkExperience from './PDFWorkExperience/PDFWorkExperience.jsx';
import SkillsToolsInterests from './PDFSkillsToolsInterests/PDFSkillsToolsInterests.jsx';
import Education from './PDFEducation/PDFEducation.jsx';

// It removes hyphenation from words across the whole PDF document
Font.registerHyphenationCallback(word => [word]);

export const MyDocument = () => {
    const { order } = useAppContext();

    return (
        <Document>
            <Page size='A4' style={{ fontFamily: 'Times-Roman', padding: 30 }} wrap>
                <PersonalDetails />

                {order.map(item => {
                    if (item.id === 'workExperience') {
                        return <WorkExperience key={item.id} wrap={true} />
                    } else if (item.id === 'skillsToolsInterests') {
                        return <SkillsToolsInterests key={item.id} wrap={false} />
                    } else {
                        return <Education key={item.id} wrap={false} />
                    }
                })} 
            </Page>
        </Document>
    )
}
