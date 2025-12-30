import { useState } from 'react';
import { useAppContext, useSkills } from '../../../../../../AppContext.jsx';

import Interest from './Interest.jsx';

import styles from './InterestsForm.module.css';

export default function InterestsForm({ interestsFormData, handleInterestsFormData, isInterestsFormOpen, handleIsInterestsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const interests = skillsToolsInterests.interests.items;
    
    const [interestInput, setInterestInput] = useState('');

    const handleInterestInput = (e) => {
        setInterestInput(e.target.value);
    }

    const revertChanges = () => {
        if (!interestsFormData) throw new Error('interestsFormData is undefined!');
        
        setCVData(draft => {
            const interests = draft.skillsToolsInterests.interests;
            if (interests === undefined) throw new Error('Interests not found!');

            interests.items = interestsFormData;
        });

        handleIsInterestsFormOpen(false);
    }

    const handleAddInterest = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!interests) throw new Error('Interests data not found!');

        setCVData(draft => {
            const newInterest = {
                id: crypto.randomUUID(),
                name: interestInput
            }

            // Prevents adding empty interests
            if (newInterest.name.trim()) {
                draft.skillsToolsInterests.interests.items.push(newInterest);
            }
        });

        setInterestInput('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!interests) throw new Error('Interests not found!');

        handleInterestsFormData(interests);
        handleIsInterestsFormOpen(false);
    }

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${isInterestsFormOpen ? styles.formOpened : ''}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>settings</span>
                <span className={styles.formHeadline}>Add Interests</span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.addInterestFormGroup}>
                    <label htmlFor="title">Interests</label>
                    <input className={styles.interestInput} autoFocus type="text" name="title" id="title" onChange={handleInterestInput} value={interestInput} placeholder="Enter a interest..." />
                    <button className={styles.addInterestBtn} onClick={handleAddInterest}>
                        <span className={`${styles.addInterestBtnIcon} material-symbols-outlined`}>add</span>
                        <span className={styles.addInterestBtnText}>Add</span>
                    </button>
                </div>

                <div className={styles.interestsContainer}>
                    {/* Checks if there are items under Interest object. */}
                    {interests.length > 0 && (
                        interests.map(item => ( 
                            <Interest key={item.id} interest={item} />
                        ))
                    )}

                    {/* Shows msg to indicate that there are no items under Interest object. */}
                    {interests.length === 0 && (
                        <span className={styles.noInterestsFoundMsg}>
                            No interests added yet. Type a interest and click "Add" to get started.
                        </span>
                    )}
                </div>

                <div className={styles.formBtnContainer}>
                    <button className={styles.formBtnCancel} onClick={revertChanges}>Cancel</button>
                    <button className={styles.formBtnSave} onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    )
}