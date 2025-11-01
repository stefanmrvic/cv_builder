import SideControls from './SideControls/SideControls.jsx';
import TopControls from './TopControls/TopControls.jsx'
import MainControls from './MainControls/MainControls.jsx'

import styles from './EditControls.module.css';

export default function EditControls({cvData, setCVData}) {
    return (
        <div className={styles.editControls}>
            <SideControls cvData={cvData} />
            <TopControls cvData={cvData} setCVData={setCVData}/>
            <MainControls cvData={cvData} setCVData={setCVData}/>
        </div>
    )
}