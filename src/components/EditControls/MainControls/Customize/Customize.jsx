import SectionsOrder from './SectionsOrder/SectionsOrder.jsx';
import BulletPoints from './BulletPoints/BulletPoints.jsx';
import SkillsOrder from './SkillsOrder/SkillsOrder.jsx';

import styles from './Customize.module.css';

export default function Customize({ style }) {
    return (
        <section id='customize-panel' role='tabpanel' className={styles.customizeContainer} style={style}>
            <SectionsOrder />
            <BulletPoints />
            <SkillsOrder />
        </section>
    )
}