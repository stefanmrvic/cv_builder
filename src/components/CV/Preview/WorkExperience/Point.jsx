import SubPoint from './SubPoint.jsx';

import styles from './WorkExperience.module.css';

export default function Point({ point, bulletPoints }) {
    return (
        <li className={`${styles.mainPoint} ${styles[bulletPoints.main]}`}>
            <p className={styles.mainPointPara}>{point.point}</p>
            
            {point.subPoints.length > 0 && (
                point.subPoints
                    .filter(subPoint => subPoint.isVisible)
                    .map(subPoint => ( 
                        <ul className={`${styles.subPoints} ${styles[bulletPoints.sub]}`}>
                            <SubPoint key={subPoint.id} subPoint={subPoint} />
                        </ul>
                    ))
            )} 
        </li>
    )
}