import Skills from './Skills.jsx'
import Tools from './Tools.jsx'
import Interests from './Interests.jsx'

import styles from './SkillsToolsInterests.module.css'

export default function SkillsToolsInterests({cvData}) {
    if (!cvData.skillsToolsInterests) return null;

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>SKILLS, TOOLS & INTERESTS</h1>
            <ul className={styles.skillsToolsInterestsList}>
                <li><Skills /></li>
                <li><Tools /></li>
                <li><Interests /></li>
            </ul>
        </div>
    )
}