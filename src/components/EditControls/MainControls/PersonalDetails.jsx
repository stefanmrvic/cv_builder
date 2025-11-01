import styles from './MainControls.module.css';

export default function PersonalDetails({cvData, setCVData}) {
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
        <div className={styles.personalDetails}>
            <form className={styles.personalDetailsForm} action="">
                <h2 className={styles.personalDataHeadline}>Personal Details</h2>

                <div className={styles.flexContainer}>
                    <label htmlFor="name">Full name</label>
                    <input type="text" id="name" value={cvData.personalInfo.fullName} onChange={handleNameChange}/>
                </div>

                <div className={styles.flexContainer}>
                    <label htmlFor="birthDay">Date of birth</label>
                    <input type="text" id="birthDay" value={cvData.personalInfo.birthDay} onChange={handleBirthDayChange}/>
                </div>

                <div className={styles.flexContainer}>
                    <label htmlFor="email">Email <span className={styles.recommendedText}>recommended</span></label>
                    <input type="email" id="email" value={cvData.personalInfo.email} onChange={handleEmailChange} />
                </div>

                <div className={styles.flexContainer}>
                    <label htmlFor="number">Phone number <span className={styles.recommendedText}>recommended</span></label>
                    <input type="tel" id="number" value={cvData.personalInfo.phone} onChange={handlePhoneChange} />
                </div>

                <div className={styles.flexContainer}>
                    <label htmlFor="address">Address <span className={styles.recommendedText}>recommended</span></label>
                    <input type="text" id="address" value={cvData.personalInfo.location} onChange={handleLocationChange} />
                </div>

                <div className={styles.flexContainer}>
                    <label htmlFor="linkedin">LinkedIn <span className={styles.recommendedText}>recommended</span></label>
                    <input type="text" id="linkedin" value={cvData.personalInfo.linkedin} onChange={handleLinkedInChange} />
                </div>
            </form>
        </div>
    )
}