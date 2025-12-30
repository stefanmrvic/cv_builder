import { useState } from 'react';
import { useAppContext, useSkills } from '../../../../../../AppContext.jsx';

import Certification from './Certification.jsx';

import styles from './CertificationsForm.module.css';

export default function CertificationsForm({ certificationsFormData, handleCertificationsFormData, isCertificationsFormOpen, handleIsCertificationsFormOpen }) {
    const { setCVData } = useAppContext();
    
    const skillsToolsInterests = useSkills();
    const certifications = skillsToolsInterests.certifications.items;

    const [certificationInput, setCertificationInput] = useState('');

    const handleCertificationInput = (e) => {
        setCertificationInput(e.target.value);
    }

    const revertChanges = () => {
        if (!certificationsFormData) throw new Error('certificationsFormData is undefined!');
        
        setCVData(draft => {
            const certifications = draft.skillsToolsInterests.certifications;
            if (certifications === undefined) throw new Error('Certifications not found!');

            certifications.items = certificationsFormData;
        });

        handleIsCertificationsFormOpen(false);
    }

    const handleAddCertification = (e) => {
        // Stop default form submit behavior
        e.preventDefault();

        if (!certifications) throw new Error('Certifications data not found!');

        setCVData(draft => {
            const newCertification = {
                id: crypto.randomUUID(),
                name: certificationInput
            }

            // Prevents adding empty certification
            if (newCertification.name.trim()) {
                draft.skillsToolsInterests.certifications.items.push(newCertification);
            }
        });

        setCertificationInput('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!certifications) throw new Error('Certifications not found!');

        handleCertificationsFormData(certifications);
        handleIsCertificationsFormOpen(false);
    }

    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formHeaderContainer} ${isCertificationsFormOpen ? styles.formOpened : ''}`}>
                <span className={`${styles.formHeaderIcon} material-symbols-outlined`}>settings</span>
                <span className={styles.formHeadline}>Add Certifications</span>
                <button className={`${styles.closeBtn} material-symbols-outlined`} onClick={revertChanges}>close_small</button>
            </div>

            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className={styles.addCertificationFormGroup}>
                    <label htmlFor="title">Certifications</label>
                    <input className={styles.certificationInput} autoFocus type="text" name="title" id="title" onChange={handleCertificationInput} value={certificationInput} placeholder="Enter a certification..." />
                    <button className={styles.addCertificationBtn} onClick={handleAddCertification}>
                        <span className={`${styles.addCertificationBtnIcon} material-symbols-outlined`}>add</span>
                        <span className={styles.addCertificationBtnText}>Add</span>
                    </button>
                </div>

                <div className={styles.certificationsContainer}>
                    {/* Checks if there are items under Certifications object. */}
                    {certifications.length > 0 && (
                        certifications.map(item => ( 
                            <Certification key={item.id} certification={item} />
                        ))
                    )}

                    {/* Shows msg to indicate that there are no items under Certifications object. */}
                    {certifications.length === 0 && (
                        <span className={styles.noCertificationsFoundMsg}>
                            No certifications added yet. Type a certification and click "Add" to get started.
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