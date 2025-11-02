import { useRef } from 'react';

import styles from './MainControls.module.css';

export default function EducationItem({itemID, setCVData, onClick, education}) {
    const aRef = useRef(null);

    const handleDeleteItem = () => {
        if (!itemID) throw new Error('itemID is undefined!');

        setCVData(draft => {
            const itemIndex = draft.education.findIndex(item => item.id === itemID);

            if (!itemIndex) throw new Error('Item not found!');

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
        <a  onClick={onClick} className={styles.btn} ref={aRef}>
            <span className={styles.btnText}>{education}</span>
            <div className={styles.showTextBtnContainer}>
                <button onClick={handleDeleteItem}>
                    <span className={`${styles.showTextBtnIcon} material-icons`}>delete</span>
                </button>
                <button onClick={handleVisibility}>
                    <span className={`${styles.showTextBtnIcon} material-symbols-outlined`}>visibility</span>
                </button>
            </div>
        </a>
    )
}