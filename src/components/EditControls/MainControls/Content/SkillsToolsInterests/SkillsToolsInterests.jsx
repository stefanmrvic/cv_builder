import { useState, useRef } from 'react';
import { useSkills } from '../../../../../AppContext.jsx';
import { getLocalStorageItem, setLocalStorageItem } from './../../../../../utils/localStorage.js';

import Certifications from './Certifications.jsx';
import CertificationsForm from './CertificationsForm/CertificationsForm.jsx';

import Skills from './Skills.jsx';
import SkillsForm from './SkillsForm/SkillsForm.jsx';

import Tools from './Tools.jsx';
import ToolsForm from './ToolsForm/ToolsForm.jsx';

import Interests from './Interests.jsx';
import InterestsForm from './InterestsForm/InterestsForm.jsx';

import styles from './SkillsToolsInterests.module.css';

export default function SkillsToolsInterests() {
    const skillsToolsInterests = useSkills();

    // Utilizing localStorage to perserve state across page reloads in case user accidentally reloads or closes the tab while filling in the fields.
    const persistentIsExpanded = getLocalStorageItem('isExpanded - Skills', false);
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const persistentIsCertificationsFormOpen = getLocalStorageItem('isFormOpen - Certifications', false);
    const [isCertificationsFormOpen, setIsCertificationsFormOpen] = useState(persistentIsCertificationsFormOpen);

    const persistentIsSkillsFormOpen = getLocalStorageItem('isFormOpen - Skills', false);
    const [isSkillsFormOpen, setIsSkillsFormOpen] = useState(persistentIsSkillsFormOpen);

    const persistentIsToolsFormOpen = getLocalStorageItem('isFormOpen - Tools', false);
    const [isToolsFormOpen, setIsToolsFormOpen] = useState(persistentIsToolsFormOpen);

    const persistentIsInterestsFormOpen = getLocalStorageItem('isFormOpen - Interests', false);
    const [isInterestsFormOpen, setIsInterestsFormOpen] = useState(persistentIsInterestsFormOpen);

    // Persistent state with localStorage for tracking the original state of the Certifications database, in case user wants to discard the made changes by clicking "Cancel" button.
    const persistentCertificationsFormData = getLocalStorageItem('formData - Certifications', skillsToolsInterests.certifications.items)
    const [certificationsFormData, setCertificationsFormData] = useState(persistentCertificationsFormData)

    // Persistent state with localStorage for tracking the original state of the Skills database, in case user wants to discard the made changes by clicking "Cancel" button.
    const persistentSkillsFormData = getLocalStorageItem('formData - Skills', skillsToolsInterests.skills.items)
    const [skillsFormData, setSkillsFormData] = useState(persistentSkillsFormData)

    // Persistent state with localStorage for tracking the original state of the Tools database, in case user wants to discard the made changes by clicking "Cancel" button.
    const persistentToolsFormData = getLocalStorageItem('formData - Tools', skillsToolsInterests.tools.items)
    const [toolsFormData, setToolsFormData] = useState(persistentToolsFormData)

    // Persistent state with localStorage for tracking the original state of the Interests database, in case user wants to discard the made changes by clicking "Cancel" button.
    const persistentInterestsFormData = getLocalStorageItem('formData - Interests', skillsToolsInterests.interests.items)
    const [interestsFormData, setInterestsFormData] = useState(persistentInterestsFormData)

    const skillsToolsInterestsCardContainerRef = useRef(null);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem('isExpanded - Skills', newState)
    }

    const handleIsCertificationsFormOpen = (newState) => {
        setIsCertificationsFormOpen(newState);
        setLocalStorageItem('isFormOpen - Certifications', newState);
    }

    const handleCertificationsFormData = (newState) => {
        setCertificationsFormData(newState);
        setLocalStorageItem('formData - Certifications', newState);
    }

    const handleIsSkillsFormOpen = (newState) => {
        setIsSkillsFormOpen(newState);
        setLocalStorageItem('isFormOpen - Skills', newState);
    }

    const handleSkillsFormData = (newState) => {
        setSkillsFormData(newState);
        setLocalStorageItem('formData - Skills', newState);
    }

    const handleIsToolsFormOpen = (newState) => {
        setIsToolsFormOpen(newState);
        setLocalStorageItem('isFormOpen - Tools', newState);
    }

    const handleToolsFormData = (newState) => {
        setToolsFormData(newState);
        setLocalStorageItem('formData - Tools', newState);
    }

    const handleIsInterestsFormOpen = (newState) => {
        setIsInterestsFormOpen(newState);
        setLocalStorageItem('isFormOpen - Interests', newState);
    }

    const handleInterestsFormData = (newState) => {
        setInterestsFormData(newState);
        setLocalStorageItem('formData - Interests', newState);
    }

    const toggleCollapsing = () => {
        if (isExpanded) handleCloseAnimation();

        handleIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        skillsToolsInterestsCardContainerRef.current.setAttribute("class", `${styles.skillsToolsInterestsContainer} ${styles.closing}`)
        skillsToolsInterestsCardContainerRef.current.onanimationend = () => handleIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.skillsToolsInterestsContainer}>
             {/* Only displays Certifications & Skills or Skills,Tools & Interests header if none of the forms are open. */}
            {(!isCertificationsFormOpen && !isSkillsFormOpen && !isToolsFormOpen && !isInterestsFormOpen) && (
                <button className={`${styles.skillsToolsInterestsHeader} ${(isSkillsFormOpen || isToolsFormOpen || isInterestsFormOpen) ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                    <span className={`${styles.btnIcon} material-icons`}>settings</span>
                    <span className={styles.skillsToolsInterestsHeadline}>Skills, Tools & Interests</span>
                    <span className={`${isExpanded ? styles.active : ''} ${styles.arrowDown} material-symbols-outlined`}>keyboard_arrow_down</span>
                </button>
            )}

            {(isExpanded && isCertificationsFormOpen) && (
                <CertificationsForm 
                    certificationsFormData={certificationsFormData} 
                    handleCertificationsFormData={handleCertificationsFormData} 
                    isCertificationsFormOpen={isCertificationsFormOpen}
                    handleIsCertificationsFormOpen={handleIsCertificationsFormOpen}
                />
            )}

            {(isExpanded && isSkillsFormOpen) && (
                <SkillsForm 
                    skillsFormData={skillsFormData} 
                    handleSkillsFormData={handleSkillsFormData} 
                    isSkillsFormOpen={isSkillsFormOpen}
                    handleIsSkillsFormOpen={handleIsSkillsFormOpen}
                />
            )}

            {(isExpanded && isToolsFormOpen) && (
                <ToolsForm 
                    toolsFormData={toolsFormData} 
                    handleToolsFormData={handleToolsFormData} 
                    isToolsFormOpen={isToolsFormOpen}
                    handleIsToolsFormOpen={handleIsToolsFormOpen}
                />
            )}

            {(isExpanded && isInterestsFormOpen) && (
                <InterestsForm 
                    interestsFormData={interestsFormData} 
                    handleInterestsFormData={handleInterestsFormData} 
                    isInterestsFormOpen={isInterestsFormOpen}
                    handleIsInterestsFormOpen={handleIsInterestsFormOpen}
                />
            )}

            {isExpanded && (
                <div className={`${styles.skillsToolsInterestsCardContainer} ${(isCertificationsFormOpen || isSkillsFormOpen || isToolsFormOpen || isInterestsFormOpen) ? styles.hidden : ''}`} ref={skillsToolsInterestsCardContainerRef}>
                    <Certifications
                        handleIsCertificationsFormOpen={handleIsCertificationsFormOpen}
                    />

                    <Skills
                        handleIsSkillsFormOpen={handleIsSkillsFormOpen}
                    />

                    <Tools
                        handleIsToolsFormOpen={handleIsToolsFormOpen}
                    />
                    
                    <Interests
                        handleIsInterestsFormOpen={handleIsInterestsFormOpen}
                    />
                </div>
            )}
        </div>
    )
}