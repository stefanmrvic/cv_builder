import Position from './Position.jsx'

import styles from './WorkExperience.module.css'

export default function Company({company}) {
    let isFirstVisiblePosition = company.positions.find(position => position.isVisible);

    return (
        <div className={styles.companyContainer}>
            {company.positions.length > 0 && company.positions.map(position => (
                <Position 
                    key={position.id}
                    isFirst={position === isFirstVisiblePosition} 
                    companyName={company.companyName}
                    location={company.location}
                    position={position} 
                />
            ))}
        </div>
    )
}