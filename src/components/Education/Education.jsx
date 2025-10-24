import SchoolName from './SchoolName.jsx'
import GraduationDate from './GraduationDate.jsx'
import Qualification from './Qualification.jsx'
import SchoolLocation from './SchoolLoaction.jsx'

import styles from './Education.module.css';

export default function Education() {
    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>EDUCATION</h1>
            <div className='flexContainer'>
                <SchoolName className={styles.schoolName} />
                <GraduationDate className={styles.graduationDate} />
            </div>
            <div className='flexContainer'>
                <Qualification className={styles.qualification} />
                <SchoolLocation className={styles.schoolLocation} />
            </div>
        </div>
    )
}