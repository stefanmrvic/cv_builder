import PersonalDetails from './PersonalDetails.jsx';
import Education from './Education.jsx';
import Experience from './Experience.jsx'

import styles from './MainControls.module.css';

export default function MainControls({cvData, setCVData}) {
    return (
        <div className={styles.mainControls}>
            <PersonalDetails cvData={cvData} setCVData={setCVData}/>
            <Education cvData={cvData} setCVData={setCVData}/>
            <Experience cvData={cvData} setCVData={setCVData}/>
        </div>
    )
}