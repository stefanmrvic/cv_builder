import styles from './Education.module.css';

export default function EducationItem({education}) {
    return (
        <div>
            <div className={styles.flexContainer}>
                <p className={styles.schoolName}><b>{education.schoolName}</b></p>
                <p className={styles.graduationDate}><b>{education.graduationDate}</b></p>
            </div>
            <div className={styles.flexContainer}>
                <p className={styles.qualification}><i>{education.qualification}</i></p>
                <p className={styles.schoolLocation}><i>{education.schoolLocation}</i></p>
            </div>
        </div>
    )
}