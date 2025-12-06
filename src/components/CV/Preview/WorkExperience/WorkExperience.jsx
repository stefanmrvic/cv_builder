import Company from './Company.jsx'

import { sortCompaniesByEmploymentDate } from '../../../../utils/sortFunctions.js';

export default function WorkExperience({data, bulletPoints}) {
    // Exits if there are no companies in experience object
    if (!data) return null;
    
    const visibleCompanies = data.filter(company => company.isVisible);
    const sortedCompanies = visibleCompanies.sort(sortCompaniesByEmploymentDate);

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