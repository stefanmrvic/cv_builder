import styles from './InterestsForm.module.css';

export default function Interest({data, setCVData, setActiveIndex, isActive, index}) {
    const handleBlur = (e) => {
        e.stopPropagation();
        setActiveIndex(null)
    }

    const handleDelete = (e) => {
        e.stopPropagation(); 
        
        setCVData(draft => {
            const interest = draft.skillsToolsInterests.interests.items.find(item => item.id === data.id);
            if (interest === undefined) throw new Error('Interest not found!');

            const interestIndex = draft.skillsToolsInterests.interests.items.findIndex(item => item.id === data.id);
            if (interestIndex === -1) throw new Error('Interest index not found!');

            draft.skillsToolsInterests.interests.items.splice(interestIndex, 1);
        })
    }

    const handleInput = (e) => {
        if (!data.id) throw new Error('Interest ID not found!');

        setCVData(draft => {
            const interest = draft.skillsToolsInterests.interests.items.find(item => item.id === data.id);
            if (interest === undefined) throw new Error('Interest not found!');

            interest.name = e.target.value;
        })
    }

    // Match the input width to the span width when a interest tag is clicked.
    const inputComponentStyles = {
        width: `${data.name.length + 2.1}ch`
    }

    return (
        <div className={`${styles.interestTag} ${isActive ? styles.active : ''}`} onClick={() => setActiveIndex(index)}>
            {isActive ? (
                <input autoFocus className={styles.interestName} value={data.name} style={inputComponentStyles} onChange={handleInput} onBlur={handleBlur}></input>
            ) : (
                <span className={styles.interestName}>{data.name}</span>
            )}

            <button className={styles.interestDeleteBtn} onClick={handleDelete}>
                <span className={`${styles.closeBtnIcon} material-symbols-outlined`}>close</span>
            </button>
        </div>
    )
}