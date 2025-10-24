import Experience from './Experience.jsx'
import ExperiencePromotion from './ExperiencePromotion.jsx'

export default function WorkExperience() {
    return (
        <div className='sectionBottomMargin'>
            <h1 className='headline'>WORK EXPERIENCE</h1>

            <Experience 
                name='Netflix'
                date='Apr. 2023 - Present'
                title='Full-Stack Software Engineer'
                location='Los Angeles, US'
                responsibilities={[
                   { primary: "Netflix is a global streaming platform that delivers entertainment to over 260 million subscribers worldwide."},
                   { primary: "As a Full-Stack Software Engineer, I design, develop, and optimize scalable web applications and internal tools.",
                     sub: [
                         "Built a content analytics dashboard using React, Node.js, and TypeScript, improving internal reporting speed by 40%.",
                         "Implemented real-time synchronization features using WebSockets and Redis for collaborative content editing.",
                         "Reduced server response times by 35% through API optimization and migration to a microservice architecture.",
                         "Collaborated with product and design teams to improve UI accessibility and user experience across internal apps."
                    ]},
                   { primary: "Developed CI/CD pipelines using GitHub Actions and Docker, ensuring reliable and automated deployments." },
                   { primary: "Mentored junior developers on best coding practices and performance optimization." }
                ]}
            />

            <ExperiencePromotion 
                date='Jun. 2021 - Mar. 2023'
                title='Software Engineer (Frontend)'
                responsibilities={[
                   { primary: "Developed reusable, scalable React components for internal tools and dashboards at Google."},
                   { primary: "Integrated REST and GraphQL APIs to streamline data flow between frontend and backend teams."},
                   { primary: "Led code reviews and implemented testing automation with Jest and Cypress to ensure high-quality releases."},
                ]}
            />

            <Experience 
                name='Black Mesa Labs'
                date='Apr. 2019 - May. 2021'
                title='Frontend Developer'
                location='Berlin, Germany'
                responsibilities={[
                   { primary: "Developed responsive and accessible web interfaces for research and development teams."},
                   { primary: "Migrated legacy jQuery projects to React, improving maintainability and reducing technical debt by 60%."},
                   { primary: "Worked closely with UX researchers to implement prototypes and conduct usability testing."},
                ]}
            />

            <ExperiencePromotion 
                date='Jan. 2018 - Apr. 2019'
                title='Junior Web Developer'
                responsibilities={[
                   { primary: "Assisted in building client-side interfaces using HTML, CSS, and JavaScript for internal tools."},
                   { primary: "Contributed to early-stage feature prototyping and documentation for the frontend development team."},
                ]}
            />
        </div>
    )
}
