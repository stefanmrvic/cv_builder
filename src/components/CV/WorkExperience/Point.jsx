import SubPoint from './SubPoint.jsx';

import styles from './WorkExperience.module.css';

export default function Point({point}) {
    return (
        <li>
            <p>{point.point}</p>
            
            <ul className={styles.subPoints}>
                {point.subPoints.length > 0 && point.subPoints.map(subPoint => ( 
                    <SubPoint 
                        key={subPoint.id}
                        subPoint={subPoint}
                    />
                ))} 
            </ul>
        </li>
    )
}