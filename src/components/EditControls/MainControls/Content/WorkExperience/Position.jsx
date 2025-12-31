import { useAppContext } from '../../../../../AppContext';

import styles from './WorkExperience.module.css';

export default function Position({ position, handleIsPositionFormOpen, handlePositionFormData, companyID }) {
    const { setCVData } = useAppContext();

    const handleDelete = (e) => {
        e.stopPropagation();
        
        setCVData(draft => {
            const companyItem = draft.workExperience.find(item => item.id === companyID);
            if (companyItem === undefined) throw new Error('Company not found!');

            const positionItem = companyItem.positions.find(item => item.id === position.id);
            if (positionItem === undefined) throw new Error('Position not found!');

            const positionIndex = companyItem.positions.findIndex(item => item.id === position.id);
            if (positionIndex === -1) throw new Error('Position index not found!');

            companyItem.positions.splice(positionIndex, 1);
        })

        // Removes the stored isExpanded state of Position inside of localStorage, in order to prevent clutter.
        removeLocalStorageItem(`isExpanded - Position: ${position.id}`);
    }

    const handleVisibility = (e) => {
        e.stopPropagation();
  
        setCVData(draft => {
            const companyItem = draft.workExperience.find(item => item.id === companyID);
            if (companyItem === undefined) throw new Error('Company not found!');

            const positionItem = companyItem.positions.find(item => item.id === position.id);
            if (positionItem === undefined) throw new Error('Position not found!');
            
            positionItem.isVisible = !position.isVisible;
       })
    }

    const handleEdit = (e) => {
        e.stopPropagation();

        if (!position.id) throw new Error('PositionID not found!');

        handlePositionFormData({
            id: position.id,
            companyID: companyID,
            isVisible: position.isVisible,
            title: position.title,
            startDate: position.startDate,
            endDate: position.endDate,
            currentlyEmployed: position.currentlyEmployed,
            responsibilities: position.responsibilities
        })

        handleIsPositionFormOpen(true);
    }

    return (
        <div className={styles.positionHeaderContainer} onClick={handleEdit} role='button'>
            <span className={styles.positionHeadline}>{position.title}</span>

            <div className={styles.positionHeaderBtnContainer}>
                <button className={styles.visibilityBtn} onClick={handleVisibility}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {position.isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>

                <button className={styles.deleteBtn} onClick={handleDelete}>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>
            </div>
        </div>
    )
}