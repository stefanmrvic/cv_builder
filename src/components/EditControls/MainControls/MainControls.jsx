import PersonalDetails from './PersonalDetails.jsx';
import Education from './Education.jsx';
import Experience from './Experience.jsx'

import styles from './MainControls.module.css';

export default function MainControls({data, setCVData}) {
    return (
        <div className={styles.mainControls}>
            <PersonalDetails data={data.personalInfo} setCVData={setCVData}/>
            <Education data={data.education} setCVData={setCVData}/>
            <Experience data={data.workExperience} setCVData={setCVData}/>
        </div>
    )
}