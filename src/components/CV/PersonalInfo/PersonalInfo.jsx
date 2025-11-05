import styles from './PersonalInfo.module.css'

export default function PersonalInfo({data}) {
    const personalInfo = [];

    for (const prop in data) {
        if((data[prop].trim().length > 0) && 
            (prop !== 'fullName' && prop !== 'linkedin')) {
                personalInfo.push(data[prop]);
        }
    }

    const lastInfoItem = personalInfo.length - 1;

    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>{data.fullName}</h1>

            <ul className={styles.details}>
                {personalInfo.map((item, index) => {
                    return <li key={index}><p>{item} {index !== lastInfoItem ? " ❖ " : ''} </p></li>
                })}

                {data.linkedin.trim() && 
                    <li>❖ <a href={data.linkedin} target='_blank'>LN</a></li>
                }
            </ul>
        </div>
    )
}
