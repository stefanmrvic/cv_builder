import { useAppContext, useEducation } from '../../../../../AppContext';

import styles from './Education.module.css';

export default function EducationItem({ ariaExpanded, educationID, isVisible, handleIsFormOpen, handleFormData }) {
    const { cvData, setCVData } = useAppContext();
    const education = useEducation();

    const populateForm = () => {
        const educationItem = education.find(item => item.id === educationID)

        if (!educationItem) return;

        handleFormData({
            id: educationItem.id,
            isVisible: educationItem.isVisibile,
            schoolName: educationItem.schoolName,
            graduationDate: educationItem.graduationDate,
            qualification: educationItem.qualification,
            schoolLocation: educationItem.schoolLocation
        })

        handleIsFormOpen(true);
    }

    const handleDeleteItem = (e) => {
        e.stopPropagation();

        if (!educationID) throw new Error('educationID is undefined!');

        setCVData(draft => {
            const educationItemIndex = draft.education.findIndex(item => item.id === educationID);

            if (educationItemIndex === undefined) throw new Error('Item not found!');

            draft.education.splice(educationItemIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();

        if (!educationID) throw new Error('educationID is undefined!');

       setCVData(draft => {
            const educationItem = draft.education.find(item => item.id === educationID);

            if (!educationItem) throw new Error('educationItem not found!');

            educationItem.isVisible = !educationItem.isVisible;
       })
    }

    const schoolName = cvData.education.find(item => item.id === educationID)?.schoolName;

    return (
        <div 
            role='button'
            aria-expanded={ariaExpanded}
            aria-controls='education-form' 
            className={styles.educationItem} 
            onClick={populateForm} 
        >
            <span className={styles.educationItemHeadline}>{schoolName}</span>
            <div className={styles.educationBtnContainer}>
                <button onClick={handleVisibility} aria-label={isVisible ? 'Hide education' : 'Show education'}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>
                
                <button onClick={handleDeleteItem} aria-label='Delete education'>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>
            </div>
        </div>
    )
}