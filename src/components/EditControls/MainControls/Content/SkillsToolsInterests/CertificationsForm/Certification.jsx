import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../../../../../AppContext';

import styles from './CertificationsForm.module.css';

export default function Certification({ certification }) {
    const { setCVData } = useAppContext();

    const [isFocused, setIsFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(null);

    const certificationNameRef = useRef(null);

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const certification = draft.skillsToolsInterests.certifications.items.find(item => item.id === certification.id);
            if (certification === undefined) throw new Error('Certification not found!');

            const certificationIndex = draft.skillsToolsInterests.certifications.items.findIndex(item => item.id === certification.id);
            if (certificationIndex === -1) throw new Error('Certification index not found!');

            draft.skillsToolsInterests.certifications.items.splice(certificationIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!certification.id) throw new Error('Certification ID not found!');

        setCVData(draft => {
            const certification = draft.skillsToolsInterests.certifications.items.find(item => item.id === certification.id);
            if (certification === undefined) throw new Error('Certification not found!');

            certification.name = e.target.value;
        })
    }

    // Calculating the width in px of invisible span element, so that I could use that with on all of the inputs.
    useEffect(() => {
        // The magic formula that just happens to work (with a bit of magic sprinkled in).
        const textWidth = certificationNameRef.current.offsetWidth + 21 + 'px';

        if (textWidth) setInputWidth(textWidth);
    }, []);

    return (
        <div className={`${styles.certificationTag} ${isFocused ? styles.active : ''}`}>
            {/* Invisible span used to measure the text width for sizing the input. */}
            <span aria-hidden="true" className={styles.invisibleCertificationName} ref={certificationNameRef}>{certification.name}</span>
            <input className={styles.certificationName} value={certification.name} style={{width: `${inputWidth}`}} onChange={handleInput} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}></input>

            <button className={styles.certificationDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}