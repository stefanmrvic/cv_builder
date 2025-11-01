import { useRef } from 'react';

import styles from './MainControls.module.css';

export default function EducationItem({setCVData, formData, onClick, education}) {
    const handleDeleteItem = () => {
        if (!formData.id) throw new Error('formData.id is undefined!');

        setCVData(draft => {
            const itemIndex = draft.education.findIndex(item => item.id === formData.id);

            if (!itemIndex) throw new Error('Item not found!');

            draft.education.splice(itemIndex, 1);
        })
    }

    const handleVisibility = (e) => {
        e.stopPropagation();

        if (!formData.id) throw new Error('formData.id not found!');

        setCVData(draft => {
            const item = draft.education.find(item => item.id === formData.id);

            if (!item) throw new Error('Item not found!');

            item.isVisible = !item.isVisible;
        })
    }

    return (
        <a  onClick={onClick} className={styles.btn}>
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