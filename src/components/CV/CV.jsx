import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CV.module.css'

export default function CV({cvData}) {
    return (
        <div className={styles.cvContainer}>
          <PersonalInfo cvData={cvData} />
          <WorkExperience cvData={cvData} />
          <SkillsToolsInterests cvData={cvData} />
          <Education cvData={cvData} />
        </div>
    )
}