import { useAppContext } from '../../../../AppContext';

import styles from './PersonalInfo.module.css'

export default function PersonalInfo() {
    const { cvData } = useAppContext();
    const personalInfo = [];

    for (const prop in cvData) {
        if((cvData[prop].trim().length > 0) && 
            (prop !== 'fullName' && prop !== 'linkedin')) {
                personalInfo.push(cvData[prop]);
        }
    }

    const lastInfoItem = personalInfo.length - 1;

    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>{cvData.fullName}</h1>

            <ul className={styles.details}>
                {personalInfo.map((item, index) => {
                    return <li key={index}><p>{item} {index !== lastInfoItem ? " ❖ " : ''} </p></li>
                })}

                {cvData.linkedin.trim() && 
                    <li>❖ <a href={cvData.linkedin} target='_blank'>LN</a></li>
                }
            </ul>
        </div>
    )
}
