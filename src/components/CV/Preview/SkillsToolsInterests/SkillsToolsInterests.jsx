import { useAppContext, useSkills } from '../../../../AppContext.jsx'

import Certifications from './Certifications.jsx'
import Skills from './Skills.jsx'
import Tools from './Tools.jsx'
import Interests from './Interests.jsx'

import styles from './SkillsToolsInterests.module.css'

export default function SkillsToolsInterests() {
    const { bulletPoints } = useAppContext();
    const { certifications, skills, tools, interests } = useSkills();

    // Returns null if there are no items under any category of certifications / skills / tools / interests
    if (certifications.items.length === 0 &&
        skills.items.length === 0 &&
        tools.items.length === 0 &&
        interests.items.length === 0
    ) return null;

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>SKILLS, TOOLS & INTERESTS</h1>
            <ul className={styles.skillsToolsInterestsList}>
                {certifications.isVisible && certifications.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Certifications />
                    </li> 
                )}

                {skills.isVisible && skills.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Skills />
                    </li>   
                )}

                {tools.isVisible && tools.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Tools />
                    </li>
                )}

                {interests.isVisible && interests.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Interests />
                    </li> 
                )}
            </ul>
        </div>
    )
}