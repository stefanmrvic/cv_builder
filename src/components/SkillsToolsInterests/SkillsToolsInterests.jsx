import Skills from './Skills.jsx'
import Tools from './Tools.jsx'
import Interests from './Interests.jsx'

export default function SkillsToolsInterests() {
    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>SKILLS, TOOLS & INTERESTS</h1>
            <ul>
                <li><Skills /></li>
                <li><Tools /></li>
                <li><Interests /></li>
            </ul>
        </div>
    )
}