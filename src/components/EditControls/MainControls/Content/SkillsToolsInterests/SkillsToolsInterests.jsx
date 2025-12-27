import { useState, useRef } from 'react';

import Skills from './Skills.jsx';
import SkillsForm from './SkillsForm/SkillsForm.jsx';

import Tools from './Tools.jsx';
import ToolsForm from './ToolsForm/ToolsForm.jsx';

import Interests from './Interests.jsx';
import InterestsForm from './InterestsForm/InterestsForm.jsx';

import styles from './SkillsToolsInterests.module.css';

export default function SkillsToolsInterests({data, setCVData}) {
    // State for Skills,Tools & Interests Header
    const [isExpanded, setIsExpanded] = useState(false);

    const [isSkillsFormOpen, setIsSkillsFormOpen] = useState(false);
    const [isToolsFormOpen, setIsToolsFormOpen] = useState(false);
    const [isInterestsFormOpen, setIsInterestsFormOpen] = useState(false);

    // State for tracking the original state of the Skills database, in case user wants to discard the made changes by clicking "Cancel" button.
    const [skillsFormData, setSkillsFormData] = useState(data.skills.items)

    // State for tracking the original state of the Tools database, in case user wants to discard the made changes by clicking "Cancel" button.
    const [toolsFormData, setToolsFormData] = useState(data.tools.items)

    // State for tracking the original state of the Interests database, in case user wants to discard the made changes by clicking "Cancel" button.
    const [interestsFormData, setInterestsFormData] = useState(data.interests.items)

    const skillsToolsInterestsCardContainerRef = useRef(null);

    const toggleCollapsing = () => {
        if (isExpanded) handleCloseAnimation();

        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        skillsToolsInterestsCardContainerRef.current.setAttribute("class", `${styles.skillsToolsInterestsContainer} ${styles.closing}`)
        skillsToolsInterestsCardContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.skillsToolsInterestsContainer}>
             {/* Only displays Skill,Tools & Interests header if none of the forms are open. */}
            {(!isSkillsFormOpen && !isToolsFormOpen && !isInterestsFormOpen) && (
                <button className={`${styles.skillsToolsInterestsHeader} ${(isSkillsFormOpen || isToolsFormOpen || isInterestsFormOpen) ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                    <span className={`${styles.btnIcon} material-icons`}>settings</span>
                    <span className={styles.skillsToolsInterestsHeadline}>Skills, Tools & Interests</span>
                    <span className={`${isExpanded ? styles.active : ''} ${styles.arrowDown} material-symbols-outlined`}>keyboard_arrow_down</span>
                </button>
            )}

            {(isExpanded && isCertificationsFormOpen) && (
                <CertificationsForm 
                    certificationsFormData={certificationsFormData} 
                    setCertificationsFormData={setCertificationsFormData} 
                    isCertificationsFormOpen={isCertificationsFormOpen}
                    setIsCertificationsFormOpen={setIsCertificationsFormOpen}
                />
            )}

            {(isExpanded && isSkillsFormOpen) && (
                <SkillsForm 
                    skillsFormData={skillsFormData} 
                    setSkillsFormData={setSkillsFormData} 
                    isSkillsFormOpen={isSkillsFormOpen}
                    setIsSkillsFormOpen={setIsSkillsFormOpen}
                />
            )}

            {(isExpanded && isToolsFormOpen) && (
                <ToolsForm 
                    toolsFormData={toolsFormData} 
                    setToolsFormData={setToolsFormData} 
                    isToolsFormOpen={isToolsFormOpen}
                    setIsToolsFormOpen={setIsToolsFormOpen}
                />
            )}

            {(isExpanded && isInterestsFormOpen) && (
                <InterestsForm 
                    interestsFormData={interestsFormData} 
                    setInterestsFormData={setInterestsFormData} 
                    isInterestsFormOpen={isInterestsFormOpen}
                    setIsInterestsFormOpen={setIsInterestsFormOpen}
                />
            )}

            {isExpanded && (
                <div className={`${styles.skillsToolsInterestsCardContainer} ${(isSkillsFormOpen || isToolsFormOpen || isInterestsFormOpen) ? styles.hidden : ''}`} ref={skillsToolsInterestsCardContainerRef}>
                    <Skills
                        data={data.skills}
                        setCVData={setCVData} 
                        setIsSkillsFormOpen={setIsSkillsFormOpen}
                    />
                    <Tools
                        data={data.tools}
                        setCVData={setCVData} 
                        setIsToolsFormOpen={setIsToolsFormOpen}
                    />
                    <Interests
                        data={data.interests}
                        setCVData={setCVData} 
                        setIsInterestsFormOpen={setIsInterestsFormOpen}
                    />
                </div>
            )}
        </div>
    )
}