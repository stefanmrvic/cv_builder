import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CV.module.css'

export default function CV({data}) {
    return (
        <div className={styles.cvContainer}>
          <PersonalInfo data={data.personalInfo} />
          <WorkExperience data={data.workExperience} />
          <SkillsToolsInterests data={data.skillsToolsInterests} />
          <Education data={data.education} />
        </div>
    )
}