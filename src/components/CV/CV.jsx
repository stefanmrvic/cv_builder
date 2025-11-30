import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CV.module.css'

export default function CV({data, order}) {
    return (
        <div className={styles.cvContainer}>
          <PersonalInfo data={data.personalInfo} />

          {order.map(item => {
            if (item.id === 'workExperience') {
              return <WorkExperience key={item.id} data={data.workExperience} />
            } else if (item.id === 'skillsToolsInterests') {
              return <SkillsToolsInterests key={item.id} data={data.skillsToolsInterests} />
            } else {
              return <Education key={item.id} data={data.education} />
            }
          })}
          
        </div>
    )
}