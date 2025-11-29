import { useState } from 'react';

import SideControls from './SideControls/SideControls.jsx';
import TopControls from './TopControls/TopControls.jsx';
import MainControls from './MainControls/MainControls.jsx';

import styles from './EditControls.module.css';

export default function EditControls({data, setCVData}) {
    const [activeTab, setActiveTab] = useState('content');

    return (
        <div className={styles.editControls}>
            <SideControls data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TopControls setCVData={setCVData} />
            <MainControls data={data} setCVData={setCVData} activeTab={activeTab} />
        </div>
    )
}