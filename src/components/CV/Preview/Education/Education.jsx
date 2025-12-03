import EducationItem from './EducationItem.jsx'

import styles from './Education.module.css';

export default function Education({data}) {
    // Exits if there are no items in education object
    if (!data) return null;

    const visibleEducationItems = data.filter(item => item.isVisible);

    // Exits if there are no visible education items
    if (visibleEducationItems.length === 0) return null;

    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>EDUCATION</h1>

            <div className={styles.educationContainer}>
                {data
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