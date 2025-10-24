import CompanyName from './CompanyName.jsx'
import StartEndDate from './StartEndDate.jsx'
import JobTitle from './JobTitle.jsx'
import WorkLocation from './WorkLocation.jsx'
import Responsibility from './Responsibility.jsx'

import styles from './WorkExperience.module.css'

export default function Experience(props) {
    return (
        <div className={styles.experienceContainer}>
            <div className='flexContainer'>
                <CompanyName 
                    className={styles.companyName}
                    name={props.name} 
                />
                <StartEndDate 
                    className={styles.startEndDate}
                    date={props.date} 
                />
            </div>
            <div className='flexContainer'>
                <JobTitle 
                    className={styles.jobTitle}
                    title={props.title} 
                />
                <WorkLocation 
                    className={styles.workLocation}
                    location={props.location} 
                />
            </div>
            <Responsibility responsibilities={props.responsibilities} />
        </div>
    )
}