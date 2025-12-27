import { useAppContext } from '../../../AppContext.jsx';

import Content from './Content/Content.jsx';
import Customize from './Customize/Customize.jsx';

import styles from './MainControls.module.css';

export default function MainControls({ activeTab }) {
    const { cvData, setCVData, order, setOrder, bulletPoints, setBulletPoints } = useAppContext();

    return (
        <div className={styles.mainControls}>
            {activeTab === 'content' ? (
                <Content />
            ) : (
                <Customize 
                    data={cvData} 
                    setCVData={setCVData} 
                    order={order}
                    setOrder={setOrder}
                    bulletPoints={bulletPoints}
                    setBulletPoints={setBulletPoints}
                />
            )}  
        </div>
    )
}