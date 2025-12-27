import PersonalDetails from './PersonalDetails/PersonalDetails.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx'
import Education from './Education/Education.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx';

import styles from './Content.module.css';

export default function Content() {
    return (
        <div className={styles.content}>
            <PersonalDetails />
            <WorkExperience />
            <SkillsToolsInterests />
            <Education />
        </div>
    )
}