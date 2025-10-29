import styles from './Education.module.css';

export default function EducationItem({schoolName, graduationDate, qualification, schoolLocation}) {
    return (
        <div>
            <div className={styles.flexContainer}>
                <p className={styles.schoolName}><b>{schoolName}</b></p>
                <p className={styles.graduationDate}><b>{graduationDate}</b></p>
            </div>
            <div className={styles.flexContainer}>
                <p className={styles.qualification}><i>{qualification}</i></p>
                <p className={styles.schoolLocation}><i>{schoolLocation}</i></p>
            </div>
        </div>
    )
}