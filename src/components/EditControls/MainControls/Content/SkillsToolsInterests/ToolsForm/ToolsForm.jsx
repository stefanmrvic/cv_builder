import { useState } from 'react';
import { useAppContext, useSkills } from '../../../../../../AppContext.jsx';

import Tool from './Tool.jsx';

import styles from './ToolsForm.module.css';

export default function ToolsForm({ toolsFormData, handleToolsFormData, isToolsFormOpen, handleIsToolsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const tools = skillsToolsInterests.tools.items;

    const [toolInput, setToolInput] = useState('');

    const handleToolInput = (e) => {
        setToolInput(e.target.value);
    }

    const revertChanges = () => {
        if (!toolsFormData) throw new Error('toolsFormData is undefined!');
        
        setCVData(draft => {
            const tools = draft.skillsToolsInterests.tools;
            if (tools === undefined) throw new Error('Tools not found!');

            tools.items = toolsFormData;
        });

        handleIsToolsFormOpen(false);
    }

    const handleAddTool = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!tools) throw new Error('Tools data not found!');

        setCVData(draft => {
            const newTool = {
                id: crypto.randomUUID(),
                name: toolInput
            }

            // Prevents adding empty tools
            if (newTool.name.trim()) {
                draft.skillsToolsInterests.tools.items.push(newTool);
            }
        });
        
        setToolInput('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!tools) throw new Error('Tools not found!');

        handleToolsFormData(tools);
        handleIsToolsFormOpen(false);
    }

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${isToolsFormOpen ? styles.formOpened : ''}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>settings</span>
                <span className={styles.formHeadline}>Add Tools</span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.addToolFormGroup}>
                    <label htmlFor="title">Tools</label>
                    <input className={styles.toolInput} autoFocus type="text" name="title" id="title" onChange={handleToolInput} value={toolInput} placeholder="Enter a tool..." />
                    <button className={styles.addToolBtn} onClick={handleAddTool}>
                        <span className={`${styles.addToolBtnIcon} material-symbols-outlined`}>add</span>
                        <span className={styles.addToolBtnText}>Add</span>
                    </button>
                </div>

                <div className={styles.toolsContainer}>
                    {/* Checks if there are items under Tool object. */}
                    {tools.length > 0 && (
                        tools.map((item) => ( 
                            <Tool key={item.id} tool={item} />
                        ))
                    )}

                    {/* Shows msg to indicate that there are no items under Tool object. */}
                    {tools.length === 0 && (
                        <span className={styles.noToolsFoundMsg}>
                            No tools added yet. Type a tool and click "Add" to get started.
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