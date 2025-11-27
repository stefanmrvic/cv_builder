

import styles from './SkillsForm.module.css';

export default function Skill({data, setCVData, setActiveIndex, isActive, index}) {
    const handleDelete = () => {
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

    return (
        <div className={styles.skillTag} onClick={() => setActiveIndex(index)}>
            {isActive ? (
                <input autoFocus className={styles.skillName} value={data.name} onChange={handleInput} onBlur={() => setActiveIndex(null)}></input>
            ) : (
                <span className={styles.skillName}>{data.name}</span>
            )}

            <button className={styles.skillDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.addPositionBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}