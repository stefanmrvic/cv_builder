import { useState } from 'react';

import Tool from './Tool.jsx';

import styles from './ToolsForm.module.css';

export default function ToolsForm({data, setCVData, toolsFormData, setToolsFormData, setIsToolsFormOpen}) {
    const [toolInput, setToolInput] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);

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

        setIsToolsFormOpen(false);
    }

    const handleAddTool = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!data) throw new Error('Tools data not found!');

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

        if(!data) throw new Error('Tools not found!');

        setToolsFormData(data);
        setIsToolsFormOpen(false);
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.addToolFormGroup}>
                    <label htmlFor="title">Tools</label>
                    <input className={styles.toolInput} autoFocus type="text" name="title" id="title" onChange={handleToolInput} onFocus={() => setActiveIndex(null)} value={toolInput} placeholder="Enter a tool..." />
                    <button className={styles.addToolBtn} onClick={handleAddTool}>
                        <span className={`${styles.addToolBtnIcon} material-symbols-outlined`}>add</span>
                        <span className={styles.addToolBtnText}>Add</span>
                    </button>
                </div>

                <div className={styles.toolsContainer}>
                    {/* Checks if there are items under Tool object. */}
                    {data.length > 0 && (
                        data.map((item, index) => ( 
                            <Tool 
                                key={item.id} 
                                data={item} 
                                setCVData={setCVData} 
                                isActive={activeIndex === index}
                                index={index}
                                setActiveIndex={setActiveIndex}
                            />
                        ))
                    )}

                    {/* Shows msg to indicate that there are no items under Tool object. */}
                    {data.length === 0 && (
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