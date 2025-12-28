import { useAppContext } from '../../../../AppContext.jsx';

import SubPoint from './SubPoint.jsx';

import styles from './WorkExperience.module.css';

export default function Point({ point }) {
    const { bulletPoints } = useAppContext();
    
    return (
        <li className={`${styles.mainPoint} ${styles[bulletPoints.main]}`}>
            <p className={styles.mainPointPara}>{point.point}</p>
            
            {point.subPoints.length > 0 && (
                <ul className={`${styles.subPoints}`}>
                    {point.subPoints
                        .filter(subPoint => subPoint.isVisible)
                        .map(subPoint => ( 
                            <SubPoint key={subPoint.id} subPoint={subPoint} className={`${styles.subPoint} ${styles[bulletPoints.sub]}`} />
                        ))}
                </ul>
            )} 
        </li>
    )
}