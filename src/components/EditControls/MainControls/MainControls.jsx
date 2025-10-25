import PersonalDetails from './PersonalDetails.jsx';

import styles from './MainControls.module.css';

export default function MainControls() {
    return (
        <div className={styles.mainControls}>
            <PersonalDetails />
        </div>
    )
}