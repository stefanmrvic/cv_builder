import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../../../../../AppContext';

import styles from './SkillsForm.module.css';

export default function Skill({ skill }) {
    const { setCVData } = useAppContext();

    const [isFocused, setIsFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(null);

    const skillNameRef = useRef(null);

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const skill = draft.skillsToolsInterests.skills.items.find(item => item.id === skill.id);
            if (skill === undefined) throw new Error('Skill not found!');

            const skillIndex = draft.skillsToolsInterests.skills.items.findIndex(item => item.id === skill.id);
            if (skillIndex === -1) throw new Error('Skill index not found!');

            draft.skillsToolsInterests.skills.items.splice(skillIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!skill.id) throw new Error('Skill ID not found!');

        setCVData(draft => {
            const skill = draft.skillsToolsInterests.skills.items.find(item => item.id === skill.id);
            if (skill === undefined) throw new Error('Skill not found!');

            skill.name = e.target.value;
        })
    }

    // Calculating the width in px of invisible span element, so that I could use that with on all of the inputs.
    useEffect(() => {
        // The magic formula that just happens to work (with a bit of magic sprinkled in).
        const textWidth = skillNameRef.current.offsetWidth + 21 + 'px';

        if (textWidth) setInputWidth(textWidth);
    }, []);

    return (
        <div className={`${styles.skillTag} ${isFocused ? styles.active : ''}`}>
            {/* Invisible span used to measure the text width for sizing the input. */}
            <span aria-hidden="true" className={styles.invisibleSkillName} ref={skillNameRef}>{skill.name}</span>
            <input className={styles.skillName} value={skill.name} style={{width: `${inputWidth}`}} onChange={handleInput} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}></input>

            <button className={styles.skillDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}