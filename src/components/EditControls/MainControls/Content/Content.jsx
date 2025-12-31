import { useAppContext } from '../../../../AppContext.jsx';

import PersonalDetails from './PersonalDetails/PersonalDetails.jsx';
import WorkExperience from './WorkExperience/WorkExperience.jsx'
import Education from './Education/Education.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx';

import styles from './Content.module.css';

export default function Content({ style }) {
    const { sectionsOrder } = useAppContext();

    return (
        <section id='content-panel' role='tabpanel' className={styles.content} style={style}>
            <PersonalDetails />

            {/* Orders edit sections based on the order set under Customize tab */}
            {sectionsOrder.map(item => {
                if (item.id === 'workExperience') {
                    return <WorkExperience key={item.id} />
                } else if (item.id === 'skillsToolsInterests') {
                    return <SkillsToolsInterests key={item.id} />
                } else {
                    return <Education key={item.id} />
                }
            })}
        </section>
    )
}