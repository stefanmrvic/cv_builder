import Skills from './Skills.jsx'
import Tools from './Tools.jsx'
import Interests from './Interests.jsx'

import styles from './SkillsToolsInterests.module.css'

export default function SkillsToolsInterests({data}) {
    if (!data) return null;

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>SKILLS, TOOLS & INTERESTS</h1>
            <ul className={styles.skillsToolsInterestsList}>
                { data.skills.length > 0 && <li><Skills data={data.skills} /></li> }
                { data.tools.length > 0 &&  <li><Tools data={data.tools} /></li> }
                { data.interests.length > 0 &&  <li><Interests data={data.interests} /></li> }
            </ul>
        </div>
    )
}