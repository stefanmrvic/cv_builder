import PositionCard from './PositionCard.jsx';

import styles from './WorkExperienceForm.module.css';

export default function ExperienceForm({data, setCVData, experienceFormData, isNewExperience, setIsNewExperience, isNewPosition, setIsNewPosition, isExperienceFormOpen, setIsExperienceFormOpen}) {    
    const handleDelete = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const companyIndex = draft.workExperience.findIndex(company => company.id === experienceFormData.id);
            if (companyIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(companyIndex, 1);
        });

        setIsExperienceFormOpen(false);
    }

    const revertChanges = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');
        
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            if (isNewExperience) {
                const companyIndex = draft.workExperience.findIndex(company => company.id === experienceFormData.id);
                if (companyIndex === -1) throw new Error('CompanyIndex not found!');

                draft.workExperience.splice(companyIndex, 1);
            } else {
                company.id = experienceFormData.id;
                company.isVisible = experienceFormData.isVisible;
                company.companyName = experienceFormData.companyName;
                company.location = experienceFormData.location;
                company.positions = experienceFormData.positions;
            }
        });

        setIsNewExperience(false);  
        setIsExperienceFormOpen(false);
    }

    const handleCompanyName = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (!company) throw new Error('Company not found!');

            company.companyName = e.target.value;
        });
    }

    const handleLocation = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (!company) throw new Error('Company not found!');

            company.location = e.target.value;
        });
    }

    const handleAddPosition = (e) => {
        e.stopPropagation();
        e.preventDefault()

        if (!data) throw new Error('data not found!');

        const newPosition = {
            id: crypto.randomUUID(),
            isVisible: true,
            title: `Position #${experienceFormData.positions.length +1}`,
            startDate: '',
            endDate: '',
            currentlyEmployed: '',
            responsibilities: []
        }

        setCVData(draft => {
            const company = draft.workExperience.find(company => company.id === experienceFormData.id);
            if (company === undefined) throw new Error('Company not found!');

            company.positions.push(newPosition)
        });
        
        setIsNewPosition(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsExperienceFormOpen(false);
        if (isNewExperience) setIsNewExperience(false);
    }

    const company = data.find(company => company.id === experienceFormData.id);

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${isExperienceFormOpen ? styles.formOpened : ''}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>business_center</span>
                <span className={styles.formHeadline}>
                    {isNewExperience ? 'Add New Experience' : 'Edit Experience'}
                </span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input type="text" name="company" id="company" autoFocus={isNewExperience} value={company.companyName} onChange={handleCompanyName} placeholder="Enter Company Name" required />
                </div>              

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={company.location} onChange={handleLocation} placeholder="Enter Location" />
                </div>

                {/* Render each position in the company */}
                {company.positions.length > 0 && (
                    company.positions.map((position, index) => {
                        const isNew = isNewPosition && index === company.positions.length - 1;

                        return <PositionCard 
                            key={position.id} 
                            index={index} 
                            data={position} 
                            setCVData={setCVData} 
                            // TO-DO: Reformat later with Context
                            companyID={experienceFormData.id}
                            isNewPosition={isNew}
                            setIsNewPosition={setIsNewPosition}
                            positionCount={experienceFormData.positions.length}
                        />
                    })
                )}

                <div className={styles.addPositionBtnContainer}>
                    <button className={styles.addPositionBtn} onClick={handleAddPosition}>
                        <span className={`${styles.addPositionBtnIcon} material-symbols-outlined`}>add</span>
                        <span>Add Position</span>
                    </button>
                </div>
            </form>
            
            <div className={styles.formBtnContainer}>
                <button className={styles.formBtnDelete} onClick={handleDelete}>
                    <span className={`${styles.formBtnDeleteIcon} material-icons`}>delete</span>
                    <span className={styles.formBtnDeleteText}>Delete</span>
                </button>
                <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                <button className={styles.formBtnSave} onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}