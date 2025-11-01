import EducationItem from './EducationItem.jsx'

import styles from './Education.module.css';

export default function Education({cvData}) {
    const educationList = cvData.education.map(item => {
        return <EducationItem 
            key={item.id}
            isVisibile={item.isVisible}
            schoolName={item.schoolName}
            graduationDate={item.graduationDate}
            qualification={item.qualification}
            schoolLocation={item.schoolLocation}
        />
    })

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>EDUCATION</h1>

            <div className={styles.educationContainer}>
                {educationList}
            </div>
        </div>
    )
}