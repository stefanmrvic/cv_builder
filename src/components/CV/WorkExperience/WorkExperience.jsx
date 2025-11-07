import Company from './Company.jsx'

export default function WorkExperience({data}) {
    // Exits if there are no companies in experience object
    if (!data) return null;

    const visibleCompanies = data.filter(company => company.isVisible);

    // Exits if there are no visible companies
    if (visibleCompanies.length === 0) return null;

    return (  
        <div className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            {data
                .filter(company => company.isVisible)
                .map((company, index) => {
                    return <Company 
                        key={index}
                        data={company}
                    />
                })
            }  
        </div>    
    )
}