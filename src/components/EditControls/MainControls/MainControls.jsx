import PersonalDetails from './PersonalDetails/PersonalDetails.jsx';
import Experience from './Experience/Experience.jsx'
import Education from './Education/Education.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx';

import styles from './MainControls.module.css';

export default function MainControls({data, setCVData}) {
    return (
        <div className={styles.mainControls}>
            <PersonalDetails data={data.personalInfo} setCVData={setCVData}/>
            <Experience data={data.workExperience} setCVData={setCVData}/>
            <SkillsToolsInterests data={data.skillsToolsInterests} setCVData={setCVData}/>
            <Education data={data.education} setCVData={setCVData}/>
        </div>
    )
}