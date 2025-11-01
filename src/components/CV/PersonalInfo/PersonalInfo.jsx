import styles from './PersonalInfo.module.css'

export default function PersonalInfo({cvData}) {
    const personalInfo = [];

    for (const prop in cvData.personalInfo) {
        if((cvData.personalInfo[prop].trim().length > 0) && 
            (prop !== 'fullName' && prop !== 'linkedin')) {
                personalInfo.push(cvData.personalInfo[prop]);
        }
    }

    const lastInfoItem = personalInfo.length - 1;

    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>{cvData.personalInfo.fullName}</h1>

            <ul className={styles.details}>
                {personalInfo.map((item, index) => {
                    return <li key={index}><p>{item} {index !== lastInfoItem ? " ❖ " : ''} </p></li>
                })}

                {cvData.personalInfo.linkedin.trim() && 
                    <li>❖ <a href={cvData.personalInfo.linkedin} target='_blank'>LN</a></li>
                }
            </ul>
        </div>
    )
}
