import { useState } from 'react';

import { getLocalStorageItem, setLocalStorageItem } from '../../utils/localStorage.js';

import SideControls from './SideControls/SideControls.jsx';
import TopControls from './TopControls/TopControls.jsx';
import MainControls from './MainControls/MainControls.jsx';

import styles from './EditControls.module.css';

export default function EditControls() {
    const persistentActiveTab = getLocalStorageItem('activeTab') || 'content';
    const [activeTab, setActiveTab] = useState(persistentActiveTab);

    const handleActiveTab = (newState) => {
        setActiveTab(newState);
        setLocalStorageItem('activeTab', newState);
    }

    return (
        <div className={styles.editControls}>
            <SideControls activeTab={activeTab} setActiveTab={handleActiveTab} />
            <TopControls />
            <MainControls activeTab={activeTab} />
        </div>
    )
}