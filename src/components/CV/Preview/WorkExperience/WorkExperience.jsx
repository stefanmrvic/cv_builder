import { useWorkExperience } from '../../../../AppContext.jsx';

import Company from './Company.jsx'

import { sortCompaniesByEmploymentDate } from '../../../../utils/sortFunctions.js';

export default function WorkExperience() {
    const workExperience = useWorkExperience();
    // Returns null if there are no companies under workExperience object
    if (workExperience.length === 0) return null;
    
    const visibleCompanies = workExperience.filter(company => company.isVisible);
    // Returns null if there are no visible companies under workExperience object
    if (visibleCompanies.length === 0) return null;

    const sortedCompanies = visibleCompanies.sort(sortCompaniesByEmploymentDate);

    return (  
        <section className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            {sortedCompanies.map(company => (
                <Company 
                    key={company.id}
                    company={company}
                />
            ))}  
        </section>    
    )
}