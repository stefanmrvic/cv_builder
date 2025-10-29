import styles from './PersonalInfo.module.css'

export default function PersonalInfo({data}) {
    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>{data.personalInfo.fullName}</h1>

            <ul className={styles.details}>
                <li><p>{data.personalInfo.birthDay} </p></li>
                {"❖ "}
                <li><p>{data.personalInfo.email} </p></li>
                {"❖ "}
                <li><p>{data.personalInfo.phone} </p></li>
                {"❖ "}
                <li><p>{data.personalInfo.location} </p></li>
                {"❖ "}
                <li><a href={data.personalInfo.linkedin} target='_blank'>LN</a></li>
            </ul>
        </div>
    )
}
