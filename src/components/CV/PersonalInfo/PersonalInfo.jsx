import styles from './PersonalInfo.module.css'

export default function PersonalInfo({cvData}) {
    return (
        <div className={`${styles.personalInfo} sectionBottomMargin`}>
            <h1 className={styles.fullName}>Mike Smith</h1>

            <ul className={styles.details}>
                <li><p>{cvData.personalInfo.birthDay} </p></li>
                {"❖ "}
                <li><p>{cvData.personalInfo.email} </p></li>
                {"❖ "}
                <li><p>{cvData.personalInfo.phone} </p></li>
                {"❖ "}
                <li><p>{cvData.personalInfo.location} </p></li>
                {"❖ "}
                <li><a href={cvData.personalInfo.linkedin} target='_blank'>LN</a></li>
            </ul>
        </div>
    )
}
