import PersonalDetails from './PersonalDetails/PersonalDetails.jsx';
import Experience from './Experience/Experience.jsx'
import Education from './Education/Education.jsx';
import SkillsToolsInterests from './SkillsToolsInterests/SkillsToolsInterests.jsx';

export default function Content({data, setCVData}) {
    return (
        <div >
            <PersonalDetails data={data.personalInfo} setCVData={setCVData} />
            <Experience data={data.workExperience} setCVData={setCVData} />
            <SkillsToolsInterests data={data.skillsToolsInterests} setCVData={setCVData} />
            <Education data={data.education} setCVData={setCVData} />
        </div>
    )
}