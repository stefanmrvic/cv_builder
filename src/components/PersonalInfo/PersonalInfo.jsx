import FullName from './FullName.jsx';
import Details from './Details.jsx';

import styles from './PersonalInfo.module.css'

export default function PersonalInfo() {
    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <FullName className={styles.fullName} />
            <Details className={styles.details} />
        </div>
    )
}
