import styles from './SkillsForm.module.css';

export default function Skill({data, setCVData, setActiveIndex, isActive, index}) {
    const handleBlur = (e) => {
        e.stopPropagation();
        setActiveIndex(null)
    }

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const skill = draft.skillsToolsInterests.skills.items.find(item => item.id === data.id);
            if (skill === undefined) throw new Error('Skill not found!');

            const skillIndex = draft.skillsToolsInterests.skills.items.findIndex(item => item.id === data.id);
            if (skillIndex === -1) throw new Error('Skill index not found!');

            draft.skillsToolsInterests.skills.items.splice(skillIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!data.id) throw new Error('Skill ID not found!');

        setCVData(draft => {
            const skill = draft.skillsToolsInterests.skills.items.find(item => item.id === data.id);
            if (skill === undefined) throw new Error('Skill not found!');

            skill.name = e.target.value;
        })
    }

    // Match the input width to the span width when a skill tag is clicked.
    const inputComponentStyles = {
        width: `${data.name.length + 2.1}ch`
    }

    return (
        <div className={`${styles.skillTag} ${isActive ? styles.active : ''}`} onClick={() => setActiveIndex(index)}>
            {isActive ? (
                <input autoFocus className={styles.skillName} value={data.name} style={inputComponentStyles} onChange={handleInput} onBlur={handleBlur}></input>
            ) : (
                <span className={styles.skillName}>{data.name}</span>
            )}

            <button className={styles.skillDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}