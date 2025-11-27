import { useState } from 'react';

import Skill from './Skill.jsx';

import styles from './SkillsForm.module.css';

export default function SkillsForm({data, setCVData, skillsFormData, setSkillsFormData, setIsSkillsFormOpen}) {
    const [skillInput, setSkillInput] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);

    const handleSkillInput = (e) => {
        setSkillInput(e.target.value);
    }

    const revertChanges = () => {
        if (!skillsFormData) throw new Error('skillsFormData is undefined!');
        
        setCVData(draft => {
            const skills = draft.skillsToolsInterests.skills;
            if (skills === undefined) throw new Error('Skills not found!');

            skills.items = skillsFormData;
        });

        setIsSkillsFormOpen(false);
    }

    const handleAddSkill = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!data) throw new Error('Skills data not found!');

        setCVData(draft => {
            const newSkill = {
                id: crypto.randomUUID(),
                name: skillInput
            }

            // Prevents adding empty skills
            if (newSkill.name.trim()) {
                draft.skillsToolsInterests.skills.items.push(newSkill);
            }
        });

        setSkillInput('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!data) throw new Error('Skills not found!');

        setSkillsFormData(data);
        setIsSkillsFormOpen(false);
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.addSkillFormGroup}>
                    <label htmlFor="title">Skills</label>
                    <input className={styles.skillInput} autoFocus type="text" name="title" id="title" onChange={handleSkillInput} onFocus={() => setActiveIndex(null)} value={skillInput} placeholder="Enter a skill..." />
                    <button className={styles.addSkillBtn} onClick={handleAddSkill}>
                        <span className={`${styles.addSkillBtnIcon} material-symbols-outlined`}>add</span>
                        <span className={styles.addSkillBtnText}>Add</span>
                    </button>
                </div>

                <div className={styles.skillsContainer}>
                    {/* Checks if there are items under Skill object. */}
                    {data.length > 0 && (
                        data.map((item, index) => ( 
                            <Skill 
                                key={item.id} 
                                data={item} 
                                setCVData={setCVData} 
                                isActive={activeIndex === index}
                                index={index}
                                setActiveIndex={setActiveIndex}
                            />
                        ))
                    )}

                    {/* Shows msg to indicate that there are no items under Skill object. */}
                    {data.length === 0 && (
                        <span className={styles.noSkillsFoundMsg}>
                            No skills added yet. Type a skill and click "Add" to get started.
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