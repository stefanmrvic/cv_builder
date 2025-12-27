import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../../../../../AppContext';

import styles from './ToolsForm.module.css';

export default function Tool({ tool }) {
    const { setCVData } = useAppContext();

    const [isFocused, setIsFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(null);

    const toolNameRef = useRef(null);

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const tool = draft.skillsToolsInterests.tools.items.find(item => item.id === tool.id);
            if (tool === undefined) throw new Error('Tool not found!');

            const toolIndex = draft.skillsToolsInterests.tools.items.findIndex(item => item.id === tool.id);
            if (toolIndex === -1) throw new Error('Tool index not found!');

            draft.skillsToolsInterests.tools.items.splice(toolIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!tool.id) throw new Error('Tool ID not found!');

        setCVData(draft => {
            const tool = draft.skillsToolsInterests.tools.items.find(item => item.id === tool.id);
            if (tool === undefined) throw new Error('Tool not found!');

            tool.name = e.target.value;
        })
    }

    // Calculating the width in px of invisible span element, so that I could use that with on all of the inputs.
    useEffect(() => {
        // The magic formula that just happens to work (with a bit of magic sprinkled in).
        const textWidth = toolNameRef.current.offsetWidth + 21 + 'px';

        if (textWidth) setInputWidth(textWidth);
    }, []);

    return (
        <div className={`${styles.toolTag} ${isFocused ? styles.active : ''}`}>
            {/* Invisible span used to measure the text width for sizing the input. */}
            <span  aria-hidden="true" className={styles.invisibleSkillName} ref={toolNameRef}>{tool.name}</span>
            <input className={styles.toolName} value={tool.name} style={{width: `${inputWidth}`}} onChange={handleInput} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}></input>

            <button className={styles.toolDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}