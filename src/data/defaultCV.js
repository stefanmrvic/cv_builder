const defaultCV = {
    personalInfo: {
        fullName: 'Mike Smith',
        birthDay: 'March 14, 1996', 
        email: 'example@gmail.com', 
        phone: '(310) 555-0198', 
        location: 'California, US', 
        linkedin: 'https://linkedin.com/'
    },
    workExperience: [
        {    
            id: '62ac48f3-6bd7-40b6-8d47-fed41f651862',
            company: 'Netflix',
            location: 'Los Angeles, US',
            positions: [
                {
                    id: '7ea45a71-884d-4604-9c4e-c1348835ad59',
                    title: 'Full-Stack Software Engineer',
                    startDate: 'Apr. 2023',
                    endDate: 'Present',
                    responsibilities: [
                        { text: "Netflix is a global streaming platform that delivers entertainment to over 260 million subscribers worldwide." },
                        { text: "As a Full-Stack Software Engineer, I design, develop, and optimize scalable web applications and internal tools.",
                            subPoints: [
                                "Built a content analytics dashboard using React, Node.js, and TypeScript, improving internal reporting speed by 40%.",
                                "Implemented real-time synchronization features using WebSockets and Redis for collaborative content editing.",
                                "Reduced server response times by 35% through API optimization and migration to a microservice architecture.",
                                "Collaborated with product and design teams to improve UI accessibility and user experience across internal apps."
                        ]},
                        { text: "Developed CI/CD pipelines using GitHub Actions and Docker, ensuring reliable and automated deployments." },
                        { text: "Mentored junior developers on best coding practices and performance optimization." }
                    ]
                },
                {
                    id: '7acda5df-8948-4e1a-b4a0-b3178f327dfe',
                    title: 'Software Engineer (Frontend)',
                    startDate: 'Jun. 2021',
                    endDate: 'Mar. 2023',
                    responsibilities: [
                        { text: "Developed reusable, scalable React components for internal tools and dashboards at Google." },
                        { text: "Integrated REST and GraphQL APIs to streamline data flow between frontend and backend teams." },
                        { text: "Led code reviews and implemented testing automation with Jest and Cypress to ensure high-quality releases." },
                    ]
                }
            ]
        },
        {
            id: 'ff66a212-98ba-4a62-a666-e18c580415e2',
            company: 'Black Mesa Labs',
            location: 'Berlin, Germany',
            positions: [
                {
                    id: '485a29cc-e997-4aad-8e9a-56626cfc68d5',
                    title: 'Frontend Developer',
                    startDate: 'Apr. 2019',
                    endDate: 'May. 2021',
                    responsibilities: [
                        { text: "Developed responsive and accessible web interfaces for research and development teams." },
                        { text: "Migrated legacy jQuery projects to React, improving maintainability and reducing technical debt by 60%." },
                        { text: "Worked closely with UX researchers to implement prototypes and conduct usability testing." },
                    ]
                },
                {
                    id: 'f20eba2d-0a5f-44f2-9860-3bf3c06285ff',
                    title: 'Junior Web Developer',
                    startDate: 'Jan. 2018',
                    endDate: 'Apr. 2019',
                    responsibilities: [
                        { text: "Assisted in building client-side interfaces using HTML, CSS, and JavaScript for internal tools." },
                        { text: "Contributed to early-stage feature prototyping and documentation for the frontend development team." },
                    ]
                },
            ]    
        }
    ],
    skillsToolsInterests: {
        skills: 'Fluent English (written & spoken); full-stack web development; JavaScript (ES6+); React; Node.js; RESTful APIs; technical troubleshooting; remote team collaboration',
        tools: 'VS Code; Git & GitHub; Linux (Arch btw); Postman; cPanel; WHM; Figma; Photoshop',
        interests: 'Boxing; strength training; running; meditation; minimalist design; traveling; Charles Bukowski'
    },
    education: [
        {
            id: 'fde42bfd-e25d-43c1-81fd-f981c7cd30c7',
            schoolName: 'UC Berkeley',
            graduationDate: 'Oct. 2024',
            qualification: 'Masters in Computer Science',
            schoolLocation: 'California, US'
        }
    ]
}

export default defaultCV;