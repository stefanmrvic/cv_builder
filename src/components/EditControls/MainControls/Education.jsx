import { useState, useRef } from 'react';

import EducationItem from './EducationItem.jsx';
import EducationForm from './EducationForm.jsx';

import styles from './MainControls.module.css';

export default function Education({data, setCVData}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isNew, setIsNew] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        schoolName: '',
        graduationDate: '',
        qualification: '',
        schoolLocation: ''
    })

    const btnContainerRef = useRef(null);
    const arrowDownRef = useRef(null);

    const toggleCollapsing = () => {
        arrowDownRef.current.classList.toggle(`${styles.active}`);

        if (isFormOpen) setIsFormOpen(!isFormOpen);
        if (isExpanded) handleCloseAnimation();

        setIsExpanded(!isExpanded);
    }

    const handleCloseAnimation = () => {
        btnContainerRef.current.setAttribute("class", `${styles.btnContainer} ${styles.closing}`)
        btnContainerRef.current.onanimationend = () => setIsExpanded(!isExpanded);
    }

    const populateForm = (id) => {
        const item = data.education.find(item => item.id === id)

        if (!item) return;

        setFormData({
            id: item.id, 
            schoolName: item.schoolName,
            graduationDate: item.graduationDate,
            qualification: item.qualification,
            schoolLocation: item.schoolLocation
        })
    }

    const handleAddBtnClick = () => {
        const createEducationItem = {
            id: crypto.randomUUID(),
            schoolName: '',
            graduationDate: '',
            qualification: '',
            schoolLocation: ''
        }

        setIsNew(true)
        setCVData(draft => {
            draft.education.push(createEducationItem)
        })
        setIsFormOpen(!isFormOpen);
    }

    const educationList = data.education.map(item => {
        return  <EducationItem 
            key={item.id}
            onClick={() => {
                populateForm(item.id)
                setIsFormOpen(!isFormOpen)}
            }
            education={item.schoolName}
        />
    });

    return (
        <div className={styles.educationContainer}>
            <button className={`${styles.toggleBtn} ${isFormOpen ? styles.formOpened : ''} ${isExpanded ? styles.active : ''}`} onClick={toggleCollapsing}>
                <span className={`${styles.btnIcon} material-symbols-outlined`}>school</span>
                <span className={styles.educationHeadline}>Education</span>
                <span className={`${styles.arrowDown} material-symbols-outlined`} ref={arrowDownRef}>keyboard_arrow_down</span>
            </button>

            {isFormOpen &&
                <EducationForm 
                    isNew={isNew}
                    setIsNew={setIsNew}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                    formData={formData} 
                    setFormData={setFormData} 
                    cvData={data} 
                    setCVData={setCVData} 
                />
            }

            {isExpanded &&
                // hides the button elements if the form is opened
                <div className={`${styles.btnContainer} ${isFormOpen ? styles.hidden : ''}`} ref={btnContainerRef}>

                    {educationList}

                    <div className={styles.addBtnContainer}>
                        <button 
                            className={`${styles.addBtn} ${styles.btn}`} 
                            onClick={() => { handleAddBtnClick() }}
                        >
                            <span className={`${styles.addBtnIcon} material-symbols-outlined`}>add</span>
                            <span>Education</span>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}