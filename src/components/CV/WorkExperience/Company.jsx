import Position from './Position.jsx'

import styles from './WorkExperience.module.css'

export default function Company({data}) {
    return (
        <div className={styles.companyContainer}>
            {data.positions.map((position, index) => (
                <Position 
                    key={index}
                    isFirst={index === 0 ? true : false} 
                    companyName={data.companyName}
                    location={data.location}
                    position={position} 
                />
            ))}
        </div>
    )
}