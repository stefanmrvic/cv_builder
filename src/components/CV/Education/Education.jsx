import EducationItem from './EducationItem.jsx'

import styles from './Education.module.css';

export default function Education({cvData}) {
    const visibleEducationItems = cvData.education.filter(item => item.isVisible);
    // Early exit if there no education items, meaning that it will remove EDUCATION headline as well
    if (visibleEducationItems.length === 0) return null;

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>EDUCATION</h1>

            <div className={styles.educationContainer}>
                {cvData.education
                    .filter(item => item.isVisible)
                    .map(item => {
                        return <EducationItem 
                            key={item.id}
                            education={item}
                        />
                    })
                }     
            </div>
        </div>
    )
}