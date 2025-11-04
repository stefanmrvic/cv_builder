import Company from './Company.jsx'

export default function WorkExperience({cvData}) {
    if (cvData.workExperience.length === 0) return null;

    return (  
        <div className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            {cvData.workExperience.map((company, index) => (
                <Company key={index} company={company} />
            ))}
        </div>    
    )
}