import styles from './ToolsForm.module.css';

export default function Tool({data, setCVData, setActiveIndex, isActive, index}) {
    const handleBlur = (e) => {
        e.stopPropagation();
        setActiveIndex(null);
    }

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const tool = draft.skillsToolsInterests.tools.items.find(item => item.id === data.id);
            if (tool === undefined) throw new Error('Tool not found!');

            const toolIndex = draft.skillsToolsInterests.tools.items.findIndex(item => item.id === data.id);
            if (toolIndex === -1) throw new Error('Tool index not found!');

            draft.skillsToolsInterests.tools.items.splice(toolIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!data.id) throw new Error('Tool ID not found!');

        setCVData(draft => {
            const tool = draft.skillsToolsInterests.tools.items.find(item => item.id === data.id);
            if (tool === undefined) throw new Error('Tool not found!');

            tool.name = e.target.value;
        })
    }

    // Match the input width to the span width when a tool tag is clicked.
    const inputComponentStyles = {
        width: `${data.name.length + 2.1}ch`
    }

    return (
        <div className={`${styles.toolTag} ${isActive ? styles.active : ''}`} onClick={() => setActiveIndex(index)}>
            {isActive ? (
                <input autoFocus className={styles.toolName} value={data.name} style={inputComponentStyles} onChange={handleInput} onBlur={handleBlur}></input>
            ) : (
                <span className={styles.toolName}>{data.name}</span>
            )}

            <button className={styles.toolDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}