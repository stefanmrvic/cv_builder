import Company from './Company.jsx'

import { compareDates } from '../../../../utils/sortFunctions.js';

export default function WorkExperience({data, bulletPoints}) {
    // Exits if there are no companies in experience object
    if (!data) return null;
    
    const visibleCompanies = data.filter(company => company.isVisible);

    const sortByEmploymentDate = (a, b) => {
        // Checks which company has a position with checked "currentlyEmployed" to put it on the top of CV.
        const mostRecentEmploymentA = a.positions.find(position => position.currentlyEmployed);
        const mostRecentEmploymentB = b.positions.find(position => position.currentlyEmployed);

        // If there are two or more companies with positions endDate checked "currentlyEmployed", decide which company
        // will precede the other one, by looking which company has more recent startDate.
        if (mostRecentEmploymentA && mostRecentEmploymentB) {
            // Converting date strings back to Date objects and then further converting them into ms int.
            const startDateA = new Date(mostRecentEmploymentA.startDate).getTime();
            const startDateB = new Date(mostRecentEmploymentB.startDate).getTime();

            // Checks if either (or both of) startDateA or startDateB are NaN which would indicate that their values are either empty or invalid.
            // In which case the other company should take precedence. Or none company should take precedence if they are both NaN.
            if (startDateA === NaN && startDateB === NaN) return 0;
            else if (startDateA < startDateB || startDateB === NaN) return 1;
            else if (startDateA > startDateB || startDateA === NaN) return -1;

            // If both numbers are equal, leave the order as is.
            return 0;
        }
        else if (mostRecentEmploymentA && !mostRecentEmploymentB) return -1;
        else if (!mostRecentEmploymentA && mostRecentEmploymentB) return 1;
    }

    const sortedCompanies = visibleCompanies.sort(sortByEmploymentDate);

    // Exits if there are no visible companies
    if (visibleCompanies.length === 0) return null;

    return (  
        <div className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            {sortedCompanies.map(company => (
                <Company 
                    key={company.id}
                    company={company}
                    bulletPoints={bulletPoints}
                />
            ))}  
        </div>    
    )
}