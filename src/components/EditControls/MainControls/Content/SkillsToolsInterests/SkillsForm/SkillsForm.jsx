import { useState } from 'react';
import { useAppContext, useSkills } from '../../../../../../AppContext.jsx';

import Skill from './Skill.jsx';

import styles from './SkillsForm.module.css';

export default function SkillsForm({ skillsFormData, setSkillsFormData, isSkillsFormOpen, setIsSkillsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const skills = skillsToolsInterests.skills.items;

    const [skillInput, setSkillInput] = useState('');

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

        if (!skills) throw new Error('Skills data not found!');

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

        if(!skills) throw new Error('Skills not found!');

        setSkillsFormData(skills);
        setIsSkillsFormOpen(false);
    }

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${isSkillsFormOpen ? styles.formOpened : ''}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>settings</span>
                <span className={styles.formHeadline}>Add Skills</span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.addSkillFormGroup}>
                    <label htmlFor="title">Skills</label>
                    <input className={styles.skillInput} autoFocus type="text" name="title" id="title" onChange={handleSkillInput} value={skillInput} placeholder="Enter a skill..." />
                    <button className={styles.addSkillBtn} onClick={handleAddSkill}>
                        <span className={`${styles.addSkillBtnIcon} material-symbols-outlined`}>add</span>
                        <span className={styles.addSkillBtnText}>Add</span>
                    </button>
                </div>

                <div className={styles.skillsContainer}>
                    {/* Checks if there are items under Skill object. */}
                    {skills.length > 0 && (
                        skills.map(item => ( 
                            <Skill key={item.id} skill={item} />
                        ))
                    )}

                    {/* Shows msg to indicate that there are no items under Skill object. */}
                    {skills.length === 0 && (
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