import PersonalDetails from './PersonalDetails.jsx';
import Education from './Education.jsx';
import Experience from './Experience.jsx'

import styles from './MainControls.module.css';

export default function MainControls() {
    return (
        <div className={styles.mainControls}>
            <PersonalDetails />
            <Education />
        </div>
    )
}