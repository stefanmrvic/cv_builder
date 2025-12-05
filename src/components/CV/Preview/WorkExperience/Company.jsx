import Position from './Position.jsx'

import styles from './WorkExperience.module.css'

export default function Company({company, bulletPoints}) {
    const visiblePositions = company.positions.filter(company => company.isVisible);

    // console.log(visiblePositions)
    let firstVisiblePosition = visiblePositions[0];

    const compareDates = (a, b) => {
        console.log(a.endDate.valueAsNumber())
        console.log(b.endDate.valueAsNumber())
        if(a.endDate === 'Present' && b.endDate === 'Present') return 0
        else if (a.endDate === 'Present') return 1;
        else if (b.endDate === 'Present') return -1;

        else if ((a.endDate.valueAsNumber - b.endDate.valueAsNumber) < 0) return -1;
        else if ((a.endDate.valueAsNumber - b.endDate.valueAsNumber) > 0) return 1;
        else return 0
    }

    // const sortedPositions = visiblePositions.sort(compareDates);
    // console.log(sortedPositions)


    return (
        <div className={styles.companyContainer}>
            {visiblePositions.map(position => (
                <Position 
                    key={position.id}
                    isFirst={position === firstVisiblePosition} 
                    companyName={company.companyName}
                    location={company.location}
                    position={position} 
                    bulletPoints={bulletPoints}
                />
            ))}
        </div>
    )
}