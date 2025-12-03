import PersonalDetails from './PersonalDetails/PersonalDetails.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx'
import Education from './Education/Education.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx';

import styles from './Content.module.css';

export default function Content({data, setCVData}) {
    return (
        <div className={styles.content}>
            <PersonalDetails data={data.personalInfo} setCVData={setCVData} />
            <WorkExperience data={data.workExperience} setCVData={setCVData} />
            <SkillsToolsInterests data={data.skillsToolsInterests} setCVData={setCVData} />
            <Education data={data.education} setCVData={setCVData} />
        </div>
    )
}