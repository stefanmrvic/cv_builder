import Certifications from './Certifications.jsx'
import Skills from './Skills.jsx'
import Tools from './Tools.jsx'
import Interests from './Interests.jsx'

import styles from './SkillsToolsInterests.module.css'

export default function SkillsToolsInterests({data, bulletPoints}) {
    // Returns null if there are no items under any category of certifications / skills / tools / interests
    if (data.certifications.items.length === 0 &&
        data.skills.items.length === 0 &&
        data.tools.items.length === 0 &&
        data.interests.items.length === 0
    ) return null;

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>SKILLS, TOOLS & INTERESTS</h1>
            <ul className={styles.skillsToolsInterestsList}>
                {data.certifications.isVisible && data.skills.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Certifications data={data.certifications.items} />
                    </li> 
                )}

                {data.skills.isVisible && data.skills.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Skills data={data.skills.items} />
                    </li>   
                )}

                {data.tools.isVisible && data.tools.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Tools data={data.tools.items} />
                    </li>
                )}

                {data.interests.isVisible && data.interests.items.length > 0 && (
                    <li className={styles[bulletPoints.main]}>
                        <Interests data={data.interests.items} />
                    </li> 
                )}
            </ul>
        </div>
    )
}