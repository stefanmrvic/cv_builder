import { useAppContext, useWorkExperience } from '../../../../../../AppContext.jsx';
import { removeLocalStorageItem, setLocalStorageItem } from '../../../../../../utils/localStorage.js';

import PositionCard from './PositionCard.jsx';

import styles from './WorkExperienceForm.module.css';

export default function ExperienceForm({ experienceFormData, isNewExperience, handleIsNewExperience, isNewPosition, handleIsNewPosition, isExperienceFormOpen, handleIsExperienceFormOpen }) {    
    const { setCVData } = useAppContext();

    const workExperience = useWorkExperience();

    const handleDelete = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');

        setCVData(draft => {
            const companyIndex = draft.workExperience.findIndex(company => company.id === experienceFormData.id);
            if (companyIndex === undefined) throw new Error('Company not found!');

            draft.workExperience.splice(companyIndex, 1);
        });

        handleIsExperienceFormOpen(false);
        setLocalStorageItem('isNewPosition', false);

        // Removes the stored isExpanded state of Company inside of localStorage, in order to prever clutter.
        removeLocalStorageItem(`isExpanded - Company: ${experienceFormData.id}`);
    }

    const revertChanges = () => {
        if (!experienceFormData.id) throw new Error('experienceFormData.id is undefined!');
        
        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === experienceFormData.id);

            if (!company) throw new Error('Company not found!');

            if (isNewExperience) {
                const companyIndex = draft.workExperience.findIndex(item => item.id === experienceFormData.id);
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

        handleIsNewExperience(false);  
        handleIsExperienceFormOpen(false);

        // Collapses all expanded Positions / Points / SubPoints cards when the user clicks on X or Cancel button.
        company.positions.map(position => {
            setLocalStorageItem(`isExpanded - Position: ${position.id}`, false);

            position.responsibilities.map(responsibility => {
                setLocalStorageItem(`isExpanded - Point: ${responsibility.id}`, false);

                responsibility.subPoints.map(subResponsibility => {
                    setLocalStorageItem(`isExpanded - SubPoint: ${subResponsibility.id}`, false);
                })
            })
        })

        setLocalStorageItem('isNewPosition', false);
    }

    const handleCompanyName = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === experienceFormData.id);
            if (!company) throw new Error('Company not found!');

            company.companyName = e.target.value;
        });
    }

    const handleLocation = (e) => {
        setCVData(draft => {
            const company = draft.workExperience.find(item => item.id === experienceFormData.id);
            if (!company) throw new Error('Company not found!');

            company.location = e.target.value;
        });
    }

    const handleAddPosition = (e) => {
        e.stopPropagation();
        e.preventDefault()

        if (!workExperience) throw new Error('workExperience not found!');

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
            const company = draft.workExperience.find(item => item.id === experienceFormData.id);
            if (company === undefined) throw new Error('Company not found!');

            company.positions.push(newPosition)
        });
        
        handleIsNewPosition(true);
        setLocalStorageItem('isNewPosition', true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleIsExperienceFormOpen(false);
        setLocalStorageItem('isNewPosition', false);

        if (isNewExperience) handleIsNewExperience(false);
    }

    const company = workExperience.find(item => item.id === experienceFormData.id);

    return (
        <div id='company-form' className={styles.formContainer}>
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
                    <input type="text" name="company" id="company" autoFocus={isNewExperience} value={company?.companyName ?? ''} onChange={handleCompanyName} placeholder="Enter Company Name" required />
                </div>              

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={company?.location ?? ''} onChange={handleLocation} placeholder="Enter Location" />
                </div>

                {/* Render each position in the company */}
                {company?.positions?.length > 0 && (
                    company?.positions?.map((position, index) => {
                        const isNew = isNewPosition && index === company.positions.length - 1;

                        return <PositionCard 
                            key={position.id} 
                            index={index} 
                            position={position} 
                            // To-DO Refactor Company ID passing logic
                            companyID={experienceFormData.id}
                            isNewPosition={isNew}
                            handleIsNewPosition={handleIsNewPosition}
                        />
                    })
                )}

                <div className={styles.addPositionBtnContainer}>
                    <button className={styles.addPositionBtn} type='button' onClick={handleAddPosition}>
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
                <button className={styles.formBtnCancel} type='button' onClick={revertChanges}>Cancel</button>
                <button className={styles.formBtnSave} onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}