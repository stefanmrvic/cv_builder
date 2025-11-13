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
            id: 'f05ad088-145e-4008-a31f-2c236e62ed53',
            isVisible: true,
            companyName: 'Netflix',
            location: 'Remote EMEA',
            positions: [
                {
                    id: '710fea86-05b4-4b7e-8512-31f564d4ac19',
                    isVisible: true,
                    title: 'Full-Stack Software Engineer',
                    startDate: 'Apr. 2023',
                    endDate: 'Present',
                    responsibilities: [
                        {   
                            id: '90f9913c-eded-4ace-a84c-3b8fda46fc18',
                            isVisible: true,
                            point: "Netflix is a global streaming platform that delivers entertainment to over 260 million subscribers worldwide.",
                            subPoints: []
                        },
                        {   
                            id: 'e9be2e38-c811-4bc6-b502-1a81054f9413',
                            isVisible: true,
                            point: "As a Full-Stack Software Engineer, I design, develop, and optimize scalable web applications and internal tools.",
                            subPoints: [
                                {
                                    id: '673ab147-8079-4741-b08b-fd779c6a1d23',
                                    isVisible: true,
                                    subPoint: "Built a content analytics dashboard using React, Node.js, and TypeScript, improving internal reporting speed by 40%."
                                },
                                {
                                    id: 'd472b7eb-b434-4732-9d54-1b5da27c6186',
                                    isVisible: true,   
                                    subPoint: "Implemented real-time synchronization features using WebSockets and Redis for collaborative content editing."
                                },
                                {
                                    id: '9965bcf2-c377-4855-b108-a24b31a12ac9',
                                    isVisible: true,
                                    subPoint: "Reduced server response times by 35% through API optimization and migration to a microservice architecture."
                                },
                                {
                                    id: '7d0b9ef0-cdd9-4de7-b06a-c0d87c5c93b7',
                                    isVisible: true,
                                    subPoint: "Collaborated with product and design teams to improve UI accessibility and user experience across internal apps."
                                }
                            ]
                        },
                        {   
                            id: '8cac0f86-90b6-4e70-ad9c-ed7a97bd9566',
                            isVisible: true,
                            point: "Developed CI/CD pipelines using GitHub Actions and Docker, ensuring reliable and automated deployments.",
                            subPoints: []
                        },
                        {   
                            id: 'c7a480a2-febc-4287-bf74-95a197fd00d7',
                            isVisible: true,
                            point: "Mentored junior developers on best coding practices and performance optimization.",
                            subPoints: []
                        }
                    ]
                },
                {
                    id: 'c76cbc1e-4508-418b-9bc9-55eb3e07310d',
                    isVisible: true,
                    title: 'Software Engineer (Frontend)',
                    startDate: 'Jun. 2021',
                    endDate: 'Mar. 2023',
                    responsibilities: [
                        {
                            id: '0a040ef3-62e0-416f-86e9-3136ff4fef0e',
                            isVisible: true,
                            point: "Developed reusable, scalable React components for internal tools and dashboards at Google.",
                            subPoints: []
                        },
                        {
                            id: 'f47de022-28cf-4880-bf54-b2138f2d6683',
                            isVisible: true,
                            point: "Integrated REST and GraphQL APIs to streamline data flow between frontend and backend teams.",
                            subPoints: []
                        },
                        {
                            id: 'bb1c6bcb-17ad-475c-9834-b361f2ef37dd',
                            isVisible: true,
                            point: "Led code reviews and implemented testing automation with Jest and Cypress to ensure high-quality releases.",
                            subPoints: []
                        }
                    ]
                }
            ]
        },
        {
            id: 'c1d4aeac-8522-4e09-b904-c6d61acc2944',
            isVisible: true,
            companyName: 'Black Mesa Labs',
            location: 'Berlin, Germany',
            positions: [
                {
                    id: '5480e0fe-60df-4661-ac9f-ffc667ed7292',
                    isVisible: true,
                    title: 'Frontend Developer',
                    startDate: 'Apr. 2019',
                    endDate: 'May. 2021',
                    responsibilities: [
                        {
                            id: '5d48db69-510c-4c2d-811e-e3f16a125556',
                            isVisible: true,
                            point: "Developed responsive and accessible web interfaces for research and development teams.",
                            subPoints: []
                        },
                        {
                            id: 'd57bcd85-4f8d-47f9-994b-31196464a32d',
                            isVisible: true,
                            point: "Migrated legacy jQuery projects to React, improving maintainability and reducing technical debt by 60%.",
                            subPoints: []
                        },
                        {
                            id: 'aa9fb497-7db3-4b12-bc5d-f3393556c3fd',
                            isVisible: true,
                            point: "Worked closely with UX researchers to implement prototypes and conduct usability testing.",
                            subPoints: []
                        }
                    ]
                },
                {
                    id: '11dbb5fb-dea5-4643-b4f1-c42afc22e540',
                    isVisible: true,
                    title: 'Junior Web Developer',
                    startDate: 'Jan. 2018',
                    endDate: 'Apr. 2019',
                    responsibilities: [
                        {
                            id: '2a417c70-49ba-487f-b808-4a2efeab5fa0',
                            isVisible: true,
                            point: "Assisted in building client-side interfaces using HTML, CSS, and JavaScript for internal tools.",
                            subPoints: []
                        },
                        {
                            id: '60c017fb-8d0f-4e72-923e-83aab521685f',
                            isVisible: true,
                            point: "Contributed to early-stage feature prototyping and documentation for the frontend development team.",
                            subPoints: []
                        }
                    ]
                }
            ]    
        }
    ],
    skillsToolsInterests: {
        skills: ['Fluent English (written & spoken)', 'full-stack web development', 'JavaScript (ES6+)', 'React', 'Node.js', 'RESTful APIs', 'technical troubleshooting', 'remote team collaboration'],
        tools: ['VS Code', 'Git & GitHub', 'Linux (Arch btw)', 'Postman', 'cPanel', 'WHM', 'Figma', 'Photoshop'],
        interests: ['Boxing', 'strength training', 'running', 'meditation', 'minimalist design', 'traveling', 'Charles Bukowski']
    },
    education: [
        {
            id: '4a9f42ae-c532-4cfb-9dd3-ebfb39b9c0ed',
            isVisible: true,
            schoolName: 'UC Berkeley',
            graduationDate: 'Oct. 2024',
            qualification: 'Masters in Computer Science',
            schoolLocation: 'California, US'
        }
    ]
}

export default defaultCV;