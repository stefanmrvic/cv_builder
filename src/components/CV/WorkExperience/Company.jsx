import Position from './Position.jsx'

import styles from './WorkExperience.module.css'

export default function Company({company}) {
    return (
        <div className={styles.companyContainer}>
            {company.positions.map((position, index) => (
                <Position 
                    key={index}
                    isFirst={index === 0 ? true : false} 
                    companyName={company.companyName}
                    location={company.location}
                    position={position} 
                />
            ))}
        </div>
    )
}