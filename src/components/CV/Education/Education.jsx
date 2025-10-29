import EducationItem from './EducationItem.jsx'

import styles from './Education.module.css';

export default function Education() {
    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>EDUCATION</h1>

            <div className={styles.educationContainer}>
                <EducationItem 
                    schoolName='UC Berkeley'
                    graduationDate='Oct. 2024'
                    qualification='Masters in Computer Science'
                    schoolLocation='California, US'
                />
            </div>
        </div>
    )
}