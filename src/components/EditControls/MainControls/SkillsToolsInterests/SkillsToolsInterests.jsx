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
    const [skillsFormData, setSkillsFormData] = useState({

    })

    // State for tracking the original state of the Tools database, in case user wants to discard the made changes by clicking "Cancel" button.
    const [toolsFormData, setToolsFormData] = useState({
        id: '',
        isVisible: '',

    })

    // State for tracking the original state of the Interests database, in case user wants to discard the made changes by clicking "Cancel" button.
    const [interestsFormData, setInterestsFormData] = useState({
        id: '',
        isVisible: '',

    })

    const skillsToolsInterestsContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isExpanded) handleCloseAnimation();

        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        skillsToolsInterestsContainerRef.current.setAttribute("class", `${styles.skillsToolsInterestsContainer} ${styles.closing}`)
        skillsToolsInterestsContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.skillsToolsInterestsContainer}>
            <button className={`${styles.skillsToolsInterestsHeader} ${(isSkillsFormOpen || isToolsFormOpen || isInterestsFormOpen) ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-icons`}>settings</span>
                <span className={styles.skillsToolsInterestsHeadline}>Skills, Tools & Interests</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {(isExpanded && isSkillsFormOpen) && (
                <SkillsForm 
                    data={data} 
                    setCVData={setCVData} 
                    skillsFormData={skillsFormData} 
                    setSkillsFormData={setSkillsFormData} 
                    isSkillsFormOpen={isSkillsFormOpen}
                    setIsSkillsFormOpen={setIsSkillsFormOpen}
                />
            )}

            {(isExpanded && isToolsFormOpen) && (
                <ToolsForm 
                    data={data} 
                    setCVData={setCVData} 
                    toolsFormData={toolsFormData} 
                    setToolsFormData={setToolsFormData} 
                    isToolsFormOpen={isToolsFormOpen}
                    setIsToolsFormOpen={setIsToolsFormOpen}
                />
            )}

            {(isExpanded && isInterestsFormOpen) && (
                <InterestsForm 
                    data={data} 
                    setCVData={setCVData} 
                    interestsFormData={interestsFormData} 
                    setInterestsFormData={setInterestsFormData} 
                    isInterestsFormOpen={isInterestsFormOpen}
                    setIsInterestsFormOpen={setIsInterestsFormOpen}
                />
            )}

            {isExpanded && (
                <div className={`${styles.skillsToolsInterestsContainer} ${(isSkillsFormOpen || isToolsFormOpen || isInterestsFormOpen) ? styles.hidden : ''}`} ref={skillsToolsInterestsContainerRef}>
                    <Skills
                        data={data}
                        setCVData={setCVData} 
                        setIsSkillsFormOpen={setIsSkillsFormOpen}
                    />
                    <Tools
                        data={data}
                        setCVData={setCVData} 
                        setIsToolsFormOpen={setIsToolsFormOpen}
                    />
                    <Interests
                        data={data}
                        setCVData={setCVData} 
                        setIsInterestsFormOpen={setIsInterestsFormOpen}
                    />
                </div>
            )}
        </div>
    )
}