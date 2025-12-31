import { useAppContext, useSkills } from '../../../../AppContext.jsx'

import Certifications from './Certifications.jsx'
import Skills from './Skills.jsx'
import Tools from './Tools.jsx'
import Interests from './Interests.jsx'

import styles from './SkillsToolsInterests.module.css'

export default function SkillsToolsInterests() {
    const { bulletPoints, skillsOrder } = useAppContext();
    const { certifications, skills, tools, interests } = useSkills();

    // Returns null if there are no items under any category of certifications / skills / tools / interests
    if (certifications.items.length === 0 &&
        skills.items.length === 0 &&
        tools.items.length === 0 &&
        interests.items.length === 0
    ) return null;

    return (
        <section className='sectionBottomMargin'>
            {certifications.items.length === 0 ? (
                <h1 className='headline'>SKILLS, TOOLS & INTERESTS</h1>
            ) : (
                <h1 className='headline'>CERTIFICATIONS & SKILLS</h1>
            )}

            <ul className={styles.skillsToolsInterestsList}>
                {/* Orders Certifications, Skills, Tools, and Interests based on the set order under Customization tab. */}
                {skillsOrder.map(item => {
                    if (item.id === 'certifications') {
                        if (!certifications.isVisible || certifications.items.length === 0) return null;
                        
                        return (
                            <li key={item.id} className={styles[bulletPoints.main]}>
                                <Certifications />
                            </li> 
                        )
                    } else if (item.id === 'skills') {
                        if (!skills.isVisible || skills.items.length === 0) return null;
                        
                        return (
                            <li key={item.id} className={styles[bulletPoints.main]}>
                                <Skills />
                            </li> 
                        )
                    } else if (item.id === 'tools') {
                        if (!tools.isVisible || tools.items.length === 0) return null;
                        
                        return (
                            <li key={item.id} className={styles[bulletPoints.main]}>
                                <Tools />
                            </li> 
                        )
                    } else {
                        if (!interests.isVisible || interests.items.length === 0) return null;

                        return (
                            <li key={item.id} className={styles[bulletPoints.main]}>
                                <Interests />
                            </li> 
                        )
                    }
                })}
            </ul>
        </section>
    )
}