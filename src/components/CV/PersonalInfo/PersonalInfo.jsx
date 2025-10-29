import styles from './PersonalInfo.module.css'

export default function PersonalInfo({data}) {
    const personalInfo = [];

    for (const prop in data.personalInfo) {
        if((data.personalInfo[prop].trim().length > 0) && 
            (prop !== 'fullName' && prop !== 'linkedin')) {
                personalInfo.push(data.personalInfo[prop]);
        }
    }

    const lastInfoItem = personalInfo.length - 1;

    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>{data.personalInfo.fullName}</h1>

            <ul className={styles.details}>
                {personalInfo.map((item, index) => {
                    return <li key={index}><p>{item} {index !== lastInfoItem ? " ❖ " : ''} </p></li>
                })}

                {data.personalInfo.linkedin.trim() && 
                    <li>❖ <a href={data.personalInfo.linkedin} target='_blank'>LN</a></li>
                }
            </ul>
        </div>
    )
}
