import Company from './Company.jsx'

export default function WorkExperience({cvData}) {
    if (!cvData.workExperience) return null;

    return (  
        <div className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            {cvData.workExperience.map((company, index) => (
                <Company key={index} company={company} />
            ))}
        </div>    
    )
}