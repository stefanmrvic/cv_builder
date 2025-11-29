import styles from './Education.module.css';

export default function EducationItem({itemID, isVisible, setCVData, onClick, education}) {
    const handleDeleteItem = (e) => {
        e.stopPropagation();

        if (!itemID) throw new Error('itemID is undefined!');

        setCVData(draft => {
            const itemIndex = draft.education.findIndex(item => item.id === itemID);

            if (itemIndex === undefined) throw new Error('Item not found!');

            draft.education.splice(itemIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();

        if (!itemID) throw new Error('itemID is undefined!');

       setCVData(draft => {
            const item = draft.education.find(item => item.id === itemID);

            if (!item) throw new Error('Item not found!');

            item.isVisible = !item.isVisible;
       })
    }

    return (
        <div className={styles.educationItem} onClick={onClick} role='button'>
            <span className={styles.educationItemHeadline}>{education}</span>
            <div className={styles.educationBtnContainer}>
                <button onClick={handleVisibility}>
                    <span className={`${styles.visibilityBtnIcon} material-symbols-outlined`}>
                        {isVisible ? 'visibility' : 'visibility_off'}
                    </span>
                </button>
                
                <button onClick={handleDeleteItem}>
                    <span className={`${styles.deleteBtnIcon} material-icons`}>delete</span>
                </button>
            </div>
        </div>
    )
}