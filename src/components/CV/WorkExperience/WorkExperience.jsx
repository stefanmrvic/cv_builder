import Company from './Company.jsx'

export default function WorkExperience({data}) {
    if (!data) return null;

    return (  
        <div className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            {data.map((company, index) => (
                <Company key={index} company={company} />
            ))}
        </div>    
    )
}