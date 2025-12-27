import { useWorkExperience } from '../../../../AppContext.jsx';

import Company from './Company.jsx'

import { sortCompaniesByEmploymentDate } from '../../../../utils/sortFunctions.js';

export default function WorkExperience() {
    const { workExperience } = useWorkExperience();
    // Exits if there are no companies in experience object
    if (!cvData) return null;
    
    const visibleCompanies = workExperience.filter(company => company.isVisible);
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
                />
            ))}  
        </div>    
    )
}