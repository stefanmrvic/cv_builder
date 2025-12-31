import { usePersonalInfo } from '../../../../AppContext';

import styles from './PersonalInfo.module.css'

export default function PersonalInfo() {
    const personalInfo = usePersonalInfo();
    const nonEmptyInfoFields = []

    // It iterates over personalInfo object inside of cvData object and checks which fields are empty
    // It pushes non-empty fields into the nonEmptyInfoFields array, so that they can be mapped over in order to put separator icon between them
    for (const prop in personalInfo) {
        if((personalInfo[prop].trim().length > 0) && 
            (prop !== 'fullName' && prop !== 'linkedin')) {
                nonEmptyInfoFields.push(personalInfo[prop]);
        }
    }

    const lastInfoItem = nonEmptyInfoFields.length - 1;

    return (
        <section className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>{personalInfo.fullName}</h1>

            <ul className={styles.details}>
                {/* It maps over the fields which ar enot empty and places separator icon between them. */}
                {nonEmptyInfoFields.map((item, index) => {
                    return <li key={index}><p>{item} {index !== lastInfoItem ? " ❖ " : ''} </p></li>
                })}

                {/* If the LinkedIn field is not empty, it will create a special <a> element for it, with link to the LinkedIn profile. */}
                {personalInfo.linkedin.trim() && 
                    <li>❖ <a href={personalInfo.linkedin} target='_blank'>LN</a></li>
                }
            </ul>
        </section>
    )
}
