import { useState, useRef } from 'react';

import styles from './PersonalDetails.module.css';

export default function PersonalDetails({data, setCVData}) {
    const [isExpanded, setIsExpanded] = useState(true);

    const personalDetailsFormRef = useRef(null);
    const arrowUpRef = useRef(null);

    const toggleCollapsing = () => {
        arrowUpRef.current.classList.toggle(`${styles.active}`);
        
        if (isExpanded) handleCloseAnimation();
        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        personalDetailsFormRef.current.setAttribute("class", `${styles.personalDetailsForm} ${styles.closing}`)
        personalDetailsFormRef.current.onanimationend = () => setIsExpanded(!isExpanded);
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
        <div className={styles.personalDetailsContainer}>
            <button className={`${styles.personalDetailsHeader} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={styles.personalDetailsHeadline}>Personal Details</span>
                <span className={`${styles.arrowUp} material-symbols-outlined`} ref={arrowUpRef}>keyboard_arrow_up</span>
            </button>

            {isExpanded && (
                <form className={styles.personalDetailsForm} ref={personalDetailsFormRef} action="">
                    <div className={styles.flexContainer}>
                        <label htmlFor="name">Full name</label>
                        <input type="text" id="name" value={data.fullName} onChange={handleNameChange}/>
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="birthDay">Date of birth</label>
                        <input type="text" id="birthDay" value={data.birthDay} onChange={handleBirthDayChange}/>
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="email">Email <span className={styles.recommendedText}>recommended</span></label>
                        <input type="email" id="email" value={data.email} onChange={handleEmailChange} />
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="number">Phone number <span className={styles.recommendedText}>recommended</span></label>
                        <input type="tel" id="number" value={data.phone} onChange={handlePhoneChange} />
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="address">Address <span className={styles.recommendedText}>recommended</span></label>
                        <input type="text" id="address" value={data.location} onChange={handleLocationChange} />
                    </div>

                    <div className={styles.flexContainer}>
                        <label htmlFor="linkedin">LinkedIn <span className={styles.recommendedText}>recommended</span></label>
                        <input type="text" id="linkedin" value={data.linkedin} onChange={handleLinkedInChange} />
                    </div>
                </form>
            )}
        </div>
    )
}