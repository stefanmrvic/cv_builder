import PersonalInfo from './PersonalInfo/PersonalInfo.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx'
import Education from './Education/Education.jsx'

import styles from './CVPreview.module.css'

export default function CVPreview({data, order, bulletPoints}) {
    return (
        <div className={styles.cvContainer}>
          <PersonalInfo data={data.personalInfo} />

          {order.map(item => {
            if (item.id === 'workExperience') {
              return <WorkExperience key={item.id} data={data.workExperience} bulletPoints={bulletPoints} />
            } else if (item.id === 'skillsToolsInterests') {
              return <SkillsToolsInterests key={item.id} data={data.skillsToolsInterests} bulletPoints={bulletPoints} />
            } else {
              return <Education key={item.id} data={data.education} />
            }
          })}
          
        </div>
    )
}