import { useEducation } from '../../../../AppContext.jsx';

import EducationItem from './EducationItem.jsx'

import styles from './Education.module.css';

export default function Education() {
    const education = useEducation();

    // Exits if there are no items in education object
    if (!education) return null;

    const visibleEducationItems = education.filter(item => item.isVisible);

    // Exits if there are no visible education items
    if (visibleEducationItems.length === 0) return null;

    return (
        <section className='sectionBottomMargin'>
            <h1 className='headline'>EDUCATION</h1>

            <div className={styles.educationContainer}>
                {education
                    .filter(item => item.isVisible)
                    .map(item => {
                        return <EducationItem 
                            key={item.id}
                            education={item}
                        />
                    })
                }     
            </div>
        </section>
    )
}