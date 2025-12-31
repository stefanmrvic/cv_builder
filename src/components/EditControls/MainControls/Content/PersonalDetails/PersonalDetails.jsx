import { useState, useRef } from 'react';
import { useAppContext, usePersonalInfo } from '../../../../../AppContext';
import { getLocalStorageItem, setLocalStorageItem } from '../../../../../utils/localStorage';

import styles from './PersonalDetails.module.css';

export default function PersonalDetails() {
    const persistentIsExpanded = getLocalStorageItem('isExpanded - PersonalDetails', true);
    const [isExpanded, setIsExpanded] = useState(persistentIsExpanded);

    const { setCVData } = useAppContext();

    const personalInfo = usePersonalInfo();
    if (!personalInfo) return null;

    const personalDetailsFormRef = useRef(null);
    const arrowUpRef = useRef(null);

    const handleIsExpanded = (newState) => {
        setIsExpanded(newState);
        setLocalStorageItem('isExpanded - PersonalDetails', newState);
    }

    const toggleCollapsing = () => {
        arrowUpRef.current.classList.toggle(`${styles.active}`);
        
        if (isExpanded) handleCloseAnimation();
        handleIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        personalDetailsFormRef.current.setAttribute("class", `${styles.personalDetailsForm} ${styles.closing}`)
        personalDetailsFormRef.current.onanimationend = () => handleIsExpanded(!isExpanded);
    }

    const handleNameChange = (e) => {
        setCVData(draft => {
            draft.personalInfo.fullName = e.target.value;
        })
    }

    const handleBirthDayChange = (e) => {
        setCVData(draft => {
            draft.personalInfo.birthDay = e.target.value;
        })
    }

    const handleEmailChange = (e) => {
        setCVData(draft => {
            draft.personalInfo.email = e.target.value;
        })
    }

    const handlePhoneChange = (e) => {
        setCVData(draft => {
            draft.personalInfo.phone = e.target.value;
        })
    }

    const handleLocationChange = (e) => {
        setCVData(draft => {
            draft.personalInfo.location = e.target.value;
        })
    }
    
    const handleLinkedInChange = (e) => {
        setCVData(draft => {
            draft.personalInfo.linkedin = e.target.value;
        })
    }

    return (
        <section className={styles.personalDetailsContainer}>
            <button 
                className={`${styles.personalDetailsHeader} ${isExpanded ? styles.active : ''}`} 
                onClick={toggleCollapsing} 
                aria-expanded={isExpanded}
                aria-controls='personal-details-form'
            >
                <span className={styles.personalDetailsHeadline}>Personal Details</span>
                <span className={`${styles.arrowUp} material-symbols-outlined`} ref={arrowUpRef}>keyboard_arrow_up</span>
            </button>

            {isExpanded && (
                <form 
                    id='personal-details-form'
                    className={styles.personalDetailsForm} 
                    ref={personalDetailsFormRef} 
                    action="#"
                >
                    <div className={styles.flexContainer}>
                        <label htmlFor="name">Full name</label>
                        <input type="text" id="name" value={personalInfo.fullName} onChange={handleNameChange}/>
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="birthDay">Date of birth</label>
                        <input type="text" id="birthDay" value={personalInfo.birthDay} onChange={handleBirthDayChange}/>
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="email">Email <span className={styles.recommendedText}>recommended</span></label>
                        <input type="email" id="email" value={personalInfo.email} onChange={handleEmailChange} />
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="number">Phone number <span className={styles.recommendedText}>recommended</span></label>
                        <input type="tel" id="number" value={personalInfo.phone} onChange={handlePhoneChange} />
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="address">Address <span className={styles.recommendedText}>recommended</span></label>
                        <input type="text" id="address" value={personalInfo.location} onChange={handleLocationChange} />
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="linkedin">LinkedIn <span className={styles.recommendedText}>recommended</span></label>
                        <input type="text" id="linkedin" value={personalInfo.linkedin} onChange={handleLinkedInChange} />
                    </div>
                </form>
            )}
        </section>
    )
}