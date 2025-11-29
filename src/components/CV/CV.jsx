import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CV.module.css'

export default function CV({data, order}) {
    return (
        <div className={styles.cvContainer}>
          <PersonalInfo data={data.personalInfo} />

          {order.map((item, index) => {
            if (item === 'experience') {
              return <WorkExperience key={index} data={data.workExperience} />
            } else if (item === 'skills') {
              return <SkillsToolsInterests key={index} data={data.skillsToolsInterests} />
            } else {
              return <Education key={index} data={data.education} />
            }
          })}

        </div>
    )
}