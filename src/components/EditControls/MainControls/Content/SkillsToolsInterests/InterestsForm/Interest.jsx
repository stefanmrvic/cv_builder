import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../../../../../AppContext';

import styles from './InterestsForm.module.css';

export default function Interest({ interest }) {
    const { setCVData } = useAppContext();
    
    const [isFocused, setIsFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(null);

    const interestNameRef = useRef(null);

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const interest = draft.skillsToolsInterests.interests.items.find(item => item.id === interest.id);
            if (interest === undefined) throw new Error('Interest not found!');

            const interestIndex = draft.skillsToolsInterests.interests.items.findIndex(item => item.id === interest.id);
            if (interestIndex === -1) throw new Error('Interest index not found!');

            draft.skillsToolsInterests.interests.items.splice(interestIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!interest.id) throw new Error('Interest ID not found!');

        setCVData(draft => {
            const interest = draft.skillsToolsInterests.interests.items.find(item => item.id === interest.id);
            if (interest === undefined) throw new Error('Interest not found!');

            interest.name = e.target.value;
        })
    }

    // Calculating the width in px of invisible span element, so that I could use that with on all of the inputs.
    useEffect(() => {
        // The magic formula that just happens to work (with a bit of magic sprinkled in).
        const textWidth = interestNameRef.current.offsetWidth + 21 + 'px';

        if (textWidth) setInputWidth(textWidth);
    }, []);

    return (
        <div className={`${styles.interestTag} ${isFocused ? styles.active : ''}`}>
            {/* Invisible span used to measure the text width for sizing the input. */}
            <span aria-hidden="true" className={styles.invisibleSkillName} ref={interestNameRef}>{interest.name}</span>
            <input className={styles.interestName} value={interest.name} style={{width: `${inputWidth}`}} onChange={handleInput} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}></input>

            <button className={styles.interestDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}