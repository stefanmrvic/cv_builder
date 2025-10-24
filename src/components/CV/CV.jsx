import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CV.module.css'

export default function CV() {
    return (
        <div className={styles.cvContainer}>
          <PersonalInfo />
          <WorkExperience />
          <SkillsToolsInterests />
          <Education />
        </div>
    )
}